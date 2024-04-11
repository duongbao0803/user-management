export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  } else {
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
}
