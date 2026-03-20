const DutyZone = require("../models/DutyZone");

module.exports = {
    list: async () => {
        return await DutyZone.all();
    },

    create: async data => {
        await DutyZone.create(data);
        return { success: true };
    },

    update: async (id, data) => {
        await DutyZone.update(id, data);
        return { success: true };
    },

    remove: async id => {
        await DutyZone.remove(id);
        return { success: true };
    }
};
