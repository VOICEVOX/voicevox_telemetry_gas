import { sheetId } from "./config";
import { requestSchema, dictWordToTuple } from "./schema";

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadsheet.getSheets()[0];
  const rawData = JSON.parse(e.postData.contents);
  const data = requestSchema.parse(rawData);

  switch (data.event) {
    case "upsert_word": {
      const values = getValues(sheet);
      const row = values.findIndex((r) => r[0] === data.properties.word_uuid);
      if (row !== -1) {
        const range = sheet.getRange(row + 2, 1, 1, sheet.getLastColumn());
        range.setValues([
          [...dictWordToTuple(data.properties), new Date().toISOString()],
        ]);
      } else {
        sheet.appendRow([
          ...dictWordToTuple(data.properties),
          new Date().toISOString(),
        ]);
      }
      break;
    }
    case "delete_word": {
      const values = getValues(sheet);
      const row = values.findIndex((r) => r[0] === data.properties.word_uuid);
      if (row === -1) break;
      sheet.deleteRow(row + 2);
      break;
    }
    default:
      throw new Error("Unknown event");
  }

  return ContentService.createTextOutput("ok");
}

export function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      api_version: 1,
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getValues(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  return sheet.getSheetValues(
    2,
    1,
    sheet.getLastRow() - 1,
    sheet.getLastColumn()
  );
}
