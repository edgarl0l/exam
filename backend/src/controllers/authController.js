const { oauth2 } = require("../config/google");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.google = (req, res) => {
    const url = oauth2.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"]
    });
    res.redirect(url);
};

exports.callback = async (req, res) => {
    const { tokens } = await oauth2.getToken(req.query.code);
    oauth2.setCredentials(tokens);

    const info = await oauth2.request({ url: "https://www.googleapis.com/oauth2/v2/userinfo" });
    const email = info.data.email;

    let user = await User.findByEmail(email);
    if (!user) {
        await User.createOAuth(email, tokens.refresh_token);
        user = await User.findByEmail(email);
    }

    const token = jwt.sign({ id: user.Id, role: user.Role }, process.env.JWT_SECRET);
    res.redirect("http://localhost:3000?token=" + token);
};
