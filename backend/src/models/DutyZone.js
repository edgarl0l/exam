const { pool, poolConnect, sql } = require("../config/db");

class DutyZone {
    static async getAll() {
        await poolConnect;
        const res = await pool.request().query("SELECT * FROM DutyZones");
        return res.recordset;
    }

    static async create(name, description, polygon) {
        await poolConnect;
        await pool.request()
            .input("name", sql.NVarChar, name)
            .input("description", sql.NVarChar, description)
            .input("polygon", sql.NVarChar, polygon)
            .query(`
        INSERT INTO DutyZones (Name, Description, PolygonGeoJson)
        VALUES (@name, @description, @polygon)
      `);
    }

    static async update(id, name, description, polygon) {
        await poolConnect;
        await pool.request()
            .input("id", sql.Int, id)
            .input("name", sql.NVarChar, name)
            .input("description", sql.NVarChar, description)
            .input("polygon", sql.NVarChar, polygon)
            .query(`
        UPDATE DutyZones
        SET Name = @name,
            Description = @description,
            PolygonGeoJson = @polygon
        WHERE Id = @id
      `);
    }

    static async delete(id) {
        await poolConnect;
        await pool.request()
            .input("id", sql.Int, id)
            .query("DELETE FROM DutyZones WHERE Id = @id");
    }
}

module.exports = DutyZone;
