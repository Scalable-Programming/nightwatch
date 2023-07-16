const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

let client = null;

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  if (client.credentials) {
    await saveCredentials(client);
  }
}

async function saveSheetData(spreadsheetId, contactPage, email) {
  const sheets = google.sheets({ version: "v4", auth: client });

  try {
    // Retrieve all sheets from the Google Sheet
    const {
      data: { sheets: allSheets },
    } = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets.properties.title,sheets.properties.sheetId",
    });

    // Iterate over each sheet
    for (const sheet of allSheets) {
      const { title } = sheet.properties;

      // Get the columns of the current sheet
      const {
        data: { values },
      } = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${title}!1:1`,
      });

      const headerRow = values[0];
      const emailColumnIndex = headerRow.indexOf("emails");
      const contactPageColumnIndex = headerRow.indexOf("contact_page");

      if (emailColumnIndex !== -1 && contactPageColumnIndex !== -1) {
        const columnsToUpdate = [
          { index: emailColumnIndex, value: email },
          { index: contactPageColumnIndex, value: contactPage },
        ];

        for (const { index, value } of columnsToUpdate) {
          const {
            data: { values: emailColumnValues },
          } = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${title}!${String.fromCharCode(
              65 + index
            )}:${String.fromCharCode(65 + index)}`,
          });

          emailColumnValues.push([value]);

          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${title}!${String.fromCharCode(
              65 + index
            )}:${String.fromCharCode(65 + index)}`,
            valueInputOption: "RAW",
            requestBody: { values: emailColumnValues },
          });
        }
      }
    }
  } catch (error) {}
}

authorize();

module.exports = saveSheetData;
