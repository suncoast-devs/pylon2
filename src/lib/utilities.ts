export function formatDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
