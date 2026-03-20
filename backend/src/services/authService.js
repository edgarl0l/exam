const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { oauth2 } = require("../config/google");

module.exports = {
    register: async data => {
        const exists = await User.findByEmail(data.email);
        if (exists) return { error: "EMAIL_EXISTS" };

        const hash = await bcrypt.hash(data.password, 10);
        await User.create({
            email: data.email,
            name: data.name,
            password: hash
        });

        return { success: true };
    },

    login: async data => {
        const user = await User.findByEmail(data.email);
        if (!user) return { error: "NOT_FOUND" };

        const ok = await bcrypt.compare(data.password, user.PasswordHash);
        if (!ok) return { error: "INVALID_PASSWORD" };

        const token = jwt.sign(
            { id: user.Id, email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return { token };
    },

    getGoogleAuthUrl: () => {
        return oauth2.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/calendar",
                "https://www.googleapis.com/auth/documents",
                "https://www.googleapis.com/auth/spreadsheets"
            ]
        });
    },

    handleGoogleCallback: async code => {
        const { tokens } = await oauth2.getToken(code);
        oauth2.setCredentials(tokens);

        const userinfo = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` }
        }).then(r => r.json());

        let user = await User.findByEmail(userinfo.email);
        if (!user) {
            await User.create({
                email: userinfo.email,
                name: userinfo.name,
                password: ""
            });
            user = await User.findByEmail(userinfo.email);
        }

        const token = jwt.sign(
            { id: user.Id, email: user.Email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return { token, google: tokens };
    }
};
