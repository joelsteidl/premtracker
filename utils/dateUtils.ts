export function formatMatchDate(utcDate: string): string {
  // Parse the UTC date string directly to avoid any timezone conversions
  const [datePart] = utcDate.split('T');
  const date = new Date(`${datePart}T00:00:00Z`);
  
  // Get UTC components - this ensures consistent behavior across server and client
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth();
  const utcDay = date.getUTCDate();
  
  // Create a new date in UTC
  const londonDate = new Date(Date.UTC(utcYear, utcMonth, utcDay));
  
  // Adjust for London timezone (UTC+1 in summer, UTC+0 in winter)
  const isBST = function(d: Date) {
    const year = d.getUTCFullYear();
    // Last Sunday in March
    const springForward = new Date(Date.UTC(year, 2, 31 - new Date(year, 2, 31).getUTCDay(), 1));
    // Last Sunday in October
    const fallBack = new Date(Date.UTC(year, 9, 31 - new Date(year, 9, 31).getUTCDay(), 1));
    return d >= springForward && d < fallBack;
  };
  
  // Add one hour if in BST
  if (isBST(londonDate)) {
    londonDate.setUTCHours(londonDate.getUTCHours() + 1);
  }
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Use UTC methods to get components to ensure consistency
  const weekday = weekdays[londonDate.getUTCDay()];
  const month = months[londonDate.getUTCMonth()];
  const day = londonDate.getUTCDate();
  
  return `${weekday} ${month} ${day}`;
}
