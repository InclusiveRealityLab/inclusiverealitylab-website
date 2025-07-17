import publications from "../../../frontend/src/sampleData/publications.js";
import { getSheetsClient, SHEET_ID } from "../config/sheetsClient.js";
import { parseGoogleSheetValues } from "../utils/parseGoogleSheetValues.js";

// const getPubData = async (req, res) => {
//   try {
//     const sheets = await getSheetsClient();
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: "Publications!A2:Z", //assumes the header is in the second row
//     });

//     const parsed = parseGoogleSheetValues(response.data.values || []);
//     res.json(parsed);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getVenueData = async (req, res) => {
//   try {
//     const sheets = await getSheetsClient();
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: "Venue!A2:Z", //assumes the header is in the second row
//     });

//     const parsed = parseGoogleSheetValues(response.data.values || []);
//     res.json(parsed);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// --- Internal data functions (do NOT use req/res here) ---
const fetchPubData = async () => {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Publications!A2:Z",
  });
  return parseGoogleSheetValues(response.data.values || []);
};

const fetchVenueData = async () => {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Venue!A2:Z",
  });
  return parseGoogleSheetValues(response.data.values || []);
};

// --- Express handlers ---
const getPubData = async (req, res) => {
  try {
    const parsed = await fetchPubData();
    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVenueData = async (req, res) => {
  try {
    const parsed = await fetchVenueData();
    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getAllPublications = async (req, res) => {
  try {
    let publicationsRaw = await fetchPubData();
    let venuesRaw = await fetchVenueData();

    for (let i = 0; i < publicationsRaw.length; i++) {
      for (let j = 0; j < venuesRaw.length; j++) {
        // users[j].product=[]
        if (publicationsRaw[i]["vanue id"] === venuesRaw[j].id) {
          publications[i].venue = venuesRaw[j]["venue name"];
        }
      }
    }

    const publicationsDetailed = [...publicationsRaw];

    res.json(publicationsDetailed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllPublications,getPubData,getVenueData };
