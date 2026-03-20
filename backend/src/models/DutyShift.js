const { poolConnect, pool } = require("../config/db");

class DutyShift {
    static async all() {
        await poolConnect;
        const r = await pool.request().query("SELECT * FROM DutyShifts");
        return r.recordset;
    }

    static async create(data) {
        await poolConnect;
        await pool.request()
            .input("userId", data.userId)
            .input("zoneId", data.zoneId)
            .input("start", data.start)
            .input("end", data.end)
            .query("INSERT INTO DutyShifts (UserId, ZoneId, StartTime, EndTime) VALUES (@userId, @zoneId, @start, @end)");
    }

    static async remove(id) {
        await poolConnect;
        await pool.request()
            .input("id", id)
            .query("DELETE FROM DutyShifts WHERE Id=@id");
    }
}

module.exports = DutyShift;
