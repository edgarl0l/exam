const fetch = require("node-fetch");

const DATASET = process.env.MAPBOX_DATASET;
const TOKEN = process.env.MAPBOX_TOKEN;

module.exports = {
    list: async () => {
        const r = await fetch(
            `https://api.mapbox.com/datasets/v1/${DATASET}/features?access_token=${TOKEN}`
        );
        return await r.json();
    },

    create: async data => {
        const r = await fetch(
            `https://api.mapbox.com/datasets/v1/${DATASET}/features?access_token=${TOKEN}`,
            {
                method: "POST",
                body: JSON.stringify({
                    type: "Feature",
                    geometry: data.geometry,
                    properties: { name: data.name }
                })
            }
        );
        return await r.json();
    },

    remove: async id => {
        await fetch(
            `https://api.mapbox.com/datasets/v1/${DATASET}/features/${id}?access_token=${TOKEN}`,
            { method: "DELETE" }
        );
        return { success: true };
    }
};
