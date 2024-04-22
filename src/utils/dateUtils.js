export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  } else {
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localTime = date.getTime() - timezoneOffset;
    const localDate = new Date(localTime);

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}
