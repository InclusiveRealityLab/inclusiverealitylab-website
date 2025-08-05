import { getSheetsClient, SHEET_ID } from "../config/sheetsClient.js";
import { parseGoogleSheetValues } from "../utils/parseGoogleSheetValues.js";

// fetches news data sorted in descending order by date
const fetchAllNews = async () => {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "News!A2:Z",
  });

  const allNewsItems = parseGoogleSheetValues(response.data.values || []);

  const sortedNews = allNewsItems.sort((a, b) => {
    return new Date(b["date"]) - new Date(a["date"]);
  });

  return sortedNews;
};

const getFeaturedNews = async (req, res) => {
  try {
    const data = await fetchAllNews();
    let result = data.filter((news) => {
      return news["show on lp"] === true;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllNews = async (req, res) => {
  try {
    const data = await fetchAllNews();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllNews, getFeaturedNews };
