const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  timeZone: 'Europe/London'
})

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/London'
})

export function formatMatchDate(dateString: string): string {
  const date = new Date(dateString)
  return dateFormatter.format(date)
}

export function formatMatchTime(dateString: string): string {
  const date = new Date(dateString)
  return timeFormatter.format(date)
}
