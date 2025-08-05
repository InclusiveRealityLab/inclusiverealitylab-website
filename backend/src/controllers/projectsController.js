import { getSheetsClient, SHEET_ID } from "../config/sheetsClient.js";
import { parseGoogleSheetValues } from "../utils/parseGoogleSheetValues.js";

// grabbing all project data for research projects only
const fetchAllProjectData = async () => {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Projects!A2:Z",
  });

  const allProjects = parseGoogleSheetValues(response.data.values || []);
 
  return allProjects.filter(project => project.type === "Research");
};


const getAllCurrentProjects = async (req, res) => {
  try {
    const data = await fetchAllProjectData();
    let result = data.filter((project)=> {
      return project["start date"] && !project["end date"]
    })
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getAllProjects = async (req, res) => {
  try {
    const data = await fetchAllProjectData();
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPastProjects = async (req, res) => {
  try {
    const data = await fetchAllProjectData();
    let result = data.filter((project)=> {
      return project["start date"] && project["end date"];
    })
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFeaturedProjects = async (req, res) => {
  try {
    const data = await fetchAllProjectData();
    let result = data.filter((project)=> {
      return project["show on lp"] === true;
    })
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export { getAllProjects, getAllCurrentProjects,getAllPastProjects,getFeaturedProjects };
