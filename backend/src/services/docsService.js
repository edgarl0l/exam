const { docs, oauth2 } = require("../config/google");

module.exports = {
    create: async data => {
        oauth2.setCredentials({ access_token: data.token });
        const d = await docs.documents.create({
            requestBody: { title: data.title }
        });
        return { id: d.data.documentId };
    },

    append: async data => {
        oauth2.setCredentials({ access_token: data.token });
        await docs.documents.batchUpdate({
            documentId: data.id,
            requestBody: {
                requests: [
                    {
                        insertText: {
                            text: data.text,
                            location: { index: data.index }
                        }
                    }
                ]
            }
        });
        return { success: true };
    }
};
