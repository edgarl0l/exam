const Track = require("../models/Track");

module.exports = {
    list: async () => {
        return await Track.all();
    },

    create: async data => {
        await Track.create(data);
        return { success: true };
    },

    remove: async id => {
        await Track.remove(id);
        return { success: true };
    }
};
