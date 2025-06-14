export function formatMatchDate(dateString: string): string {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Europe/London'
  });
  
  // Format the date and remove any commas from the output
  return formatter.format(date).replace(',', '');
}

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/London'
})

export function formatMatchTime(dateString: string): string {
  const date = new Date(dateString)
  return timeFormatter.format(date)
}
