const User = require("../models/User");

module.exports = {
    list: async () => {
        return await User.all();
    },

    pending: async () => {
        return await User.allPending();
    },

    confirm: async id => {
        await User.confirm(id);
        return { success: true };
    },

    remove: async id => {
        await User.remove(id);
        return { success: true };
    }
};