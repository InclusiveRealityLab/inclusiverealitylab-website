import { getSheetsClient, SHEET_ID } from "../config/sheetsClient.js";
import { parseGoogleSheetValues } from "../utils/parseGoogleSheetValues.js";

const getAllProjects = async (req, res) => {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Projects!A2:Z", //assumes the header is in the second row
    });
    const parsed = parseGoogleSheetValues(response.data.values || []);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllProjects };
