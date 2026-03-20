const { sheets, oauth2 } = require("../config/google");

module.exports = {
    read: async q => {
        oauth2.setCredentials({ access_token: q.token });
        const r = await sheets.spreadsheets.values.get({
            spreadsheetId: q.id,
            range: q.range
        });
        return r.data.values;
    },

    append: async data => {
        oauth2.setCredentials({ access_token: data.token });
        await sheets.spreadsheets.values.append({
            spreadsheetId: data.id,
            range: data.range,
            valueInputOption: "RAW",
            requestBody: { values: [data.values] }
        });
        return { success: true };
    }
};
