import type { Node, Root, Text, Parent, RootContent } from 'mdast'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMDX from 'remark-mdx'
import remarkHtml from 'remark-html'

function assertsType<T> (val: unknown): asserts val is T {}

const truncateMDXContent = (limit: number): ((x: Root) => void) => {
  if (limit === -1) return () => {}
  let charactersCount = 0
  let reachedLimit = false

  const truncateTree = (node: Node | Root): Node | null => {
    if (reachedLimit) {
      return null
    }

    if (node.type === 'text') {
      assertsType<Text>(node)
      const remainingCharacters = limit - charactersCount
      if (node.value.length > remainingCharacters) {
        node.value = node.value.substring(0, remainingCharacters) + '...'
        reachedLimit = true
      }
      charactersCount += node.value.length
    } else if ('children' in node) {
      assertsType<Parent>(node)
      node.children = node.children.map(truncateTree).filter(x => x != null) as RootContent[]
    }

    return node
  }

  return (tree: Root) => {
    truncateTree(tree)
  }
}

const removeImportsAndExports = () => {
  return (tree: Root) => {
    tree.children = tree.children.filter((node: Node) => {
      return node.type !== 'mdxjsEsm' && // import tags
        node.type !== 'mdxJsxFlowElement' // custom components (Image, Pintora)
    })
  }
}
export const convertMDXToHTML = async (mdxContent: string, maxChars?: number): Promise<string> => {
  try {
    const file = await unified()
      .use(remarkParse) // Parse the Markdown syntax
      .use(remarkMDX) // Parse the MDX syntax
      .use(removeImportsAndExports)
      .use(truncateMDXContent, maxChars ?? -1)
      .use(remarkHtml) // Convert to HTML
      .process(mdxContent) // Process the MDX content
    return String(file)
  } catch (error) {
    console.error('Error converting MDX to HTML:', error)
    throw error
  }
}
