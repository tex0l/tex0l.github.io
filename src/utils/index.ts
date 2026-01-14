export const slugify = (id: string): string => {
  const splitId = id.split('/')
  if (splitId.length <= 1) return id // does not conform to expected format
  const idWithoutI18n = splitId[1].split('.')
  if (idWithoutI18n.length > 1 && !Number.isNaN(parseInt(idWithoutI18n[0]))) idWithoutI18n.shift() // if starts with a number,
  if (idWithoutI18n.length > 1 && (idWithoutI18n[idWithoutI18n.length - 1] === 'md' || idWithoutI18n[idWithoutI18n.length - 1] === 'mdx')) idWithoutI18n.pop() // if ends with md (expected format, but lenient anyway)
  return idWithoutI18n.join('.')
}

export function assertsType<T> (_val: unknown): asserts _val is T {}

export function fsUrlToProjectRelativeSrc(input: string, projectRoot?: string): string {
  // Drop query string (e.g., ?origWidth=...)
  let cleaned = input.split('?')[0]
  // Drop Vite's /@fs prefix
  if (cleaned.startsWith('/@fs')) cleaned = cleaned.slice(4)
  // If an absolute path is given, optionally strip the project root
  if (projectRoot && cleaned.startsWith(projectRoot)) {
    cleaned = cleaned.slice(projectRoot.length)
  }
  // Normalize to the first /src/ occurrence
  const srcIndex = cleaned.indexOf('/src/')
  if (srcIndex !== -1) cleaned = cleaned.slice(srcIndex)
  // Ensure it starts with ./
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned
  return '.' + cleaned
}
