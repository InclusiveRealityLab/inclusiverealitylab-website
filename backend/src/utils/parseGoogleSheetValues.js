// this function is used to parse the raw data from Google Sheets API (an array of arrays) into an array of objects each having the specific header as a key
//assumes the first row contains headers
export function parseGoogleSheetValues(data) {
  const [headers, ...rows] = data;

  return rows.map((row) => {
    return Object.fromEntries(
      headers.map((header, i) => {
        return [header, row[i] || ""];
      })
    );
  });
}
