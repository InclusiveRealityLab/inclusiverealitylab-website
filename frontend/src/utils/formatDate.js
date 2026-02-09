// expects date as a string representation, converts it into local date then formats the date into "Month Date, Year"
export function formatDate(givenDate) {
 
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


  const dateObj = new Date(givenDate);

  const date = dateObj.getDate();
  const monthIndex = dateObj.getMonth()+1;
  const year = dateObj.getFullYear();

  return `${months[monthIndex]} ${date}, ${year}`;

  
}
