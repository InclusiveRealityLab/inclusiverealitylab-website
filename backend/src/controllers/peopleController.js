import { getSheetsClient, SHEET_ID } from "../config/sheetsClient.js";
import { parseGoogleSheetValues } from "../utils/parseGoogleSheetValues.js";
import formatProfilePhotoURL from "../utils/formatProfilePhotoURL.js";

const getAllPeople = async (req, res) => {
  try {
    const sheets = await getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "People!A2:Z", //assumes the header is in the second row
    });
    const parsed = parseGoogleSheetValues(response.data.values || []);
    // little processing to add a category field based on role
    parsed.forEach((person) => {
      if (person.profile) {
        person.profile = formatProfilePhotoURL(person.profile);
      }

      if (person.role === "Collaborator") {
        person.category = "Collaborator";
      } else if (person.role === "Alumni") {
        person.category = "Alumni";
      } else {
        person.category = "Lab";
      }
      switch (person.role.toLowerCase()) {
        case "director":
          person.place = 1;
          break;
        case "designer":
          person.place = 2;
          break;
        case "engineer":
          person.place = 2;
          break;
        case "wellbeing manager":
          person.place = 2;
          break;
        case "phd student":
          person.place = 3;
          break;
        case "master student":
          person.place = 4;
          break;
        case "undergraduate student":
          person.place = 5;
          break;
        default:
          break;
      }
    });
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllPeople };
