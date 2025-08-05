// expects date as a string in the format of "YYYY-MM-DD", formats the date into "Month Date, Year"
export function formatDate(givenDate) {
  // const monthPart = givenDate.match(/-(\d{2})-/)[0];
  // const datePart = givenDate.match(/-(\d{2})/)[0];
  // const yearPart = givenDate.match(/(d{4})-/)[0];

  const [yearPart, monthPart, dayPart] = givenDate.split("-");

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = parseInt(monthPart,10);

  const day = parseInt(dayPart,10);

  return `${months[monthIndex]} ${day}, ${yearPart}`;
}
