import { getSheetsClient, SHEET_ID } from "../config/sheetsClient.js";

const getAllProjects = async (req, res) => {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Projects!A2:Z",
    });
    res.json(response.data.values);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllProjects };
