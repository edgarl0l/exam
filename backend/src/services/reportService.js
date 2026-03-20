const { docs, sheets, oauth2 } = require("../config/google");
const Track = require("../models/Track");
const DutyZone = require("../models/DutyZone");
const DutyShift = require("../models/DutyShift");

module.exports = {
    daily: async data => {
        oauth2.setCredentials({ access_token: data.token });

        const tracks = await Track.all();
        const zones = await DutyZone.all();
        const shifts = await DutyShift.all();

        const sheet = await sheets.spreadsheets.values.get({
            spreadsheetId: data.sheetId,
            range: data.range
        });

        const d = await docs.documents.create({
            requestBody: { title: data.title }
        });

        const text =
            "Отчёт за " + data.date + "\n\n" +
            "Зоны: " + zones.length + "\n" +
            "Дежурства: " + shifts.length + "\n" +
            "Следы в БД: " + tracks.length + "\n" +
            "Следы в Google Sheets: " + sheet.data.values.length + "\n";

        await docs.documents.batchUpdate({
            documentId: d.data.documentId,
            requestBody: {
                requests: [
                    {
                        insertText: {
                            text,
                            location: { index: 1 }
                        }
                    }
                ]
            }
        });

        return { id: d.data.documentId };
    }
};
