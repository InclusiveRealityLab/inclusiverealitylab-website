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

      // Someone is alumni once their end date has passed -- not merely because
      // one is recorded. A leaving date set in the future still describes a
      // current member, so they stay in Lab or Collaborator until it arrives.
      //
      // The three branches are ordered so a future end date cannot fall
      // through all of them: only the first tests the end date at all, and the
      // other two ask nothing about it.
      const hasLeft =
        person["end date"] && new Date(person["end date"]) < new Date();

      if (person["start date"] && hasLeft) {
        person.category = "Alumni";
      } else if (person["start date"] && person.role === "Collaborator") {
        person.category = "Collaborator";
      } else if (person["start date"]) {
        person.category = "Lab";
      }
      // this enforces ordering of profiles in the people page 
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
