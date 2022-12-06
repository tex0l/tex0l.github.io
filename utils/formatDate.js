export const formatDateFromNow = date => {
  let ago = 'ago'
  let daysAgo = Math.floor((new Date() - new Date(date)) / 1000 / 3600 / 24)
  if (Number.isNaN(daysAgo)) return
  if (daysAgo === 0) return 'today'
  if (daysAgo === 1) return 'yesterday'
  if (daysAgo === -1) return 'tomorrow'
  if (daysAgo < 0) {
    ago = 'from now'
    daysAgo = -daysAgo
  }
  if (daysAgo < 7) return `${daysAgo} days ${ago}`
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ${ago}`
  if (daysAgo < 365) return `${Math.floor(daysAgo / 30)} months ${ago}`
  return `${Math.floor(daysAgo / 365)} years ${ago}`
}

export const formatDateAbsolute = rawDate => {
  const date = new Date(rawDate)
  return `${date.getUTCFullYear().toString().padStart(4,'0')}/${(date.getMonth() + 1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')}`
}

export const isValid = date => !Number.isNaN((new Date(date)).getDate())
