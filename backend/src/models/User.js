const { poolConnect, pool } = require("../config/db");

class User {
    static async findByEmail(email) {
        await poolConnect;
        const r = await pool.request().input("email", email)
            .query("SELECT * FROM Users WHERE Email=@email");
        return r.recordset[0];
    }

    static async create(data) {
        await poolConnect;
        await pool.request()
            .input("email", data.email)
            .input("name", data.name)
            .input("password", data.password)
            .query("INSERT INTO Users (Email, Name, PasswordHash) VALUES (@email, @name, @password)");
    }
    static async createOAuth(email, refresh) {
        await poolConnect;
        await pool.request()
            .input("email", email)
            .input("refresh", refresh)
            .query("INSERT INTO Users (Email, RefreshToken, Role, IsConfirmed) VALUES (@email, @refresh, 'none', 0)");
    }

    static async findByEmail(email) {
        await poolConnect;
        const r = await pool.request().input("email", email).query("SELECT * FROM Users WHERE Email=@email");
        return r.recordset[0];
    }

    static async createManager() {
        await poolConnect;
        const r = await pool.request().query("SELECT * FROM Users WHERE Email='manager'");
        if (r.recordset.length === 0) {
            await pool.request()
                .input("email", "manager")
                .input("password", "12345")
                .input("role", "manager")
                .query("INSERT INTO Users (Email, Password, Role, IsConfirmed) VALUES (@email, @password, @role, 1)");
        }
    }

    static async allPending() {
        await poolConnect;
        const r = await pool.request().query("SELECT * FROM Users WHERE IsConfirmed=0");
        return r.recordset;
    }

    static async confirm(id) {
        await poolConnect;
        await pool.request().input("id", id)
            .query("UPDATE Users SET IsConfirmed=1 WHERE Id=@id");
    }
}

module.exports = User;
