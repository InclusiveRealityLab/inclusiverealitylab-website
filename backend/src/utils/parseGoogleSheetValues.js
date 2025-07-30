// this function is used to parse the raw data from Google Sheets API (an array of arrays) into an array of objects each having the specific header as a key
//assumes the first row contains headers
export function parseGoogleSheetValues(data) {
  const [headers, ...rows] = data;

  return rows.map((row) => {
    return Object.fromEntries(
      headers.map((header, i) => {

        const field = header.toLowerCase();
        const rawValue = row[i] || "";

        return [header.toLowerCase(),parseToRelevantDataType(field,rawValue)];
      })
    );
  });
}


function parseToRelevantDataType (fieldName,value){
  let trimmed = value.trim();

  if (trimmed.toLowerCase()=== "false") return false;
  if (trimmed.toLowerCase()=== "true") return false;

  // const date = new Date(trimmed);
  // if (!isNaN(date) && /^\d{4}-\d{2}-\d{2}/.test(trimmed)) return date;

  if (fieldName.toLowerCase() == "research theme" || fieldName.toLowerCase() == "member name" || fieldName.toLowerCase() == "author name") {
    return trimmed.split(",").map((item) => item.trim());

  }
  return trimmed;

}