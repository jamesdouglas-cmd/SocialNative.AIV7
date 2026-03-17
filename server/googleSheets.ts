import { google } from "googleapis";

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set");
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendToSheet(
  sheetId: string,
  range: string,
  values: (string | number | null)[][]
): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}

/** Returns the tab name for the current month, e.g. "March 2026". Creates the tab if it doesn't exist. */
export async function ensureMonthlyTab(sheetId: string): Promise<string> {
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const now = new Date();
  const tabName = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Check existing sheets
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const exists = meta.data.sheets?.some(s => s.properties?.title === tabName);

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: tabName } } }] },
    });
    // Write column headers on the new tab
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${tabName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [["Date Published", "Type", "Title", "Byline", "Copy", "Tag", "Author", "URL"]],
      },
    });
  }

  return tabName;
}

/** Appends a content item to the current month's tab in the blog Google Sheet. */
export async function appendToBlogSheet(
  sheetId: string,
  entry: {
    date: string;
    type: string;
    title: string;
    byline: string;
    copy: string;
    tag: string;
    author: string;
    url: string;
  }
): Promise<void> {
  const tabName = await ensureMonthlyTab(sheetId);
  await appendToSheet(sheetId, `${tabName}!A:H`, [[
    entry.date,
    entry.type,
    entry.title,
    entry.byline,
    entry.copy,
    entry.tag,
    entry.author,
    entry.url,
  ]]);
}

export async function ensureSheetHeaders(
  sheetId: string,
  sheetName: string,
  headers: string[]
): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Check if headers already exist
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheetName}!A1:Z1`,
  });

  const existingHeaders = res.data.values?.[0];
  if (!existingHeaders || existingHeaders.length === 0) {
    // Write headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] },
    });
  }
}
