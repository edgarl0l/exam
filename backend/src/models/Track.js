const { poolConnect, pool } = require("../config/db");

class Track {
    static async all() {
        await poolConnect;
        const r = await pool.request().query("SELECT * FROM Tracks");
        return r.recordset;
    }

    static async create(data) {
        await poolConnect;
        await pool.request()
            .input("date", data.date)
            .input("zoneId", data.zoneId)
            .input("animal", data.animal)
            .input("count", data.count)
            .query("INSERT INTO Tracks (Date, ZoneId, Animal, Count) VALUES (@date, @zoneId, @animal, @count)");
    }

    static async remove(id) {
        await poolConnect;
        await pool.request()
            .input("id", id)
            .query("DELETE FROM Tracks WHERE Id=@id");
    }
}

module.exports = Track;
