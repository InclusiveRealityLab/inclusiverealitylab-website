import dotenv from "dotenv";
dotenv.config();
import CREDENTIALS from "../../credentials.json" assert { type: "json" };
import { google } from "googleapis";



const SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
}

export { getSheetsClient, SHEET_ID };