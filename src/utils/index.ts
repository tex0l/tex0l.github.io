export const slugify = (id: string): string => {
  const splitId = id.split('/')
  if (splitId.length <= 1) return id // does not conform to expected format
  const idWithoutI18n = splitId[1].split('.')
  if (idWithoutI18n.length > 1 && !Number.isNaN(parseInt(idWithoutI18n[0]))) idWithoutI18n.shift() // if starts with a number,
  if (idWithoutI18n.length > 1 && (idWithoutI18n[idWithoutI18n.length - 1] === 'md' || idWithoutI18n[idWithoutI18n.length - 1] === 'mdx')) idWithoutI18n.pop() // if ends with md (expected format, but lenient anyway)
  return idWithoutI18n.join('.')
}
