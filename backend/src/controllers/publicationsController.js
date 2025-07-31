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
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 20;

    let publicationsRaw = await fetchPubData();
    publicationsRaw = publicationsRaw.filter((pub)=>pub["status"].toLowerCase() == "accepted" && pub["publish date"] != ""); // only those which have been accepted and whose publish date is present
    let venuesRaw = await fetchVenueData();

    
    publicationsRaw.sort((a, b) =>
      new Date(b["publish date"]) - new Date(a["publish date"])
    );

    // apply pagination BEFORE enrichment
    const paginatedSlice = publicationsRaw.slice(offset, offset + limit);

    
    for (let pub of paginatedSlice) {
      const matchingVenue = venuesRaw.find(
        (venue) => venue.id === pub["venue id"]
      );
      pub.venue = matchingVenue?.["venue name"] || null;
    }

    res.json(paginatedSlice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllPublications,getPubData,getVenueData };
