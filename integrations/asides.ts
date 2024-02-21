// Register directive nodes in mdast:
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="mdast-util-directive" />
// The reason why we have to use a triple slash reference here is because we just need the type to be registered in mdast,
// but we don't use them namely, therefore importing types would result in unused types, and importing the module globally
// would execute code we do not want

import type { AstroIntegration } from 'astro'
import type * as unified from 'unified'
import type * as mdast from 'mdast'
import type { MdxJsxAttribute, MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import 'mdast-util-directive'
import remarkDirective from 'remark-directive'
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'

interface NodeProps {
  attributes?: Record<string, string | boolean | number | undefined | null>
}

/**
 * Create AST node for a custom component injection.
 *
 * @example
 * makeComponentNode('MyComponent', { prop: 'val' }, h('p', 'Paragraph inside component'))
 *
 */
function makeComponentNode (
  name: string,
  { attributes = {} }: NodeProps = {},
  ...children: Array<mdast.BlockContent | mdast.DefinitionContent>
): MdxJsxFlowElement {
  return {
    type: 'mdxJsxFlowElement',
    name,
    attributes: Object.entries(attributes)
    // Filter out non-truthy attributes to avoid empty attrs being parsed as `true`.
      .filter(([_k, v]) => v !== false && Boolean(v))
      .map(([name, value]) => ({
        type: 'mdxJsxAttribute',
        name,
        value: value as MdxJsxAttribute['value']
      })),
    children
  }
}

const AsideTagname = 'AutoImportedAside'
export const asideAutoImport: Record<string, Array<[string, string]>> = {
  '~/components/Aside.astro': [['default', AsideTagname]]
}

/**
 * remark plugin that converts blocks delimited with `:::` into instances of
 * the `<Aside>` component. Depends on the `remark-directive` module for the
 * core parsing logic.
 *
 * For example, this Markdown
 *
 * ```md
 * :::tip[Did you know?]
 * Astro helps you build faster websites with “Islands Architecture”.
 * :::
 * ```
 *
 * will produce this output
 *
 * ```astro
 * <Aside type="tip" title="Did you know?">
 *   <p>Astro helps you build faster websites with “Islands Architecture”.</p>
 * </Aside>
 * ```
 */
function remarkAsides (): unified.Plugin<[], mdast.Root> {
  const variants = new Set(['note', 'tip', 'caution', 'danger'])

  const transformer: unified.Transformer<mdast.Root> = (tree) => {
    visit(tree, (node, index, parent) => {
      if (parent == null || index == null || node.type !== 'containerDirective') return
      const type = node.name
      if (!variants.has(type)) return

      // remark-directive converts a container’s “label” to a paragraph in
      // its children, but we want to pass it as the title prop to <Aside>, so
      // we iterate over the children, find a directive label, store it for the
      // title prop, and remove the paragraph from children.
      let title: string | undefined
      remove(node, (child) => {
        // unist-util-remove defines types that are incompatible with remark-directive contrary to unist-util-visit
        if ((child as mdast.Paragraph).data?.directiveLabel != null) {
          const head: mdast.PhrasingContent | undefined = ((child as mdast.Paragraph).children ?? [])[0]
          if (head != null && 'value' in head) title = head.value
          return true
        }
      })

      // Replace this node with the aside component it represents.
      parent.children[index] = makeComponentNode(
        AsideTagname,
        { attributes: { type, title } },
        ...node.children
      )
    })
  }

  return function attacher () {
    return transformer
  }
}

/**
 * Astro integration that sets up the remark plugin and auto-imports the `<Aside>` component everywhere.
 */
export default function (): AstroIntegration {
  return {
    name: '@astrojs/asides',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkDirective, remarkAsides()]
          }
        })
      }
    }
  }
}
