const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const zoneRoutes = require("./src/routes/zoneRoutes");
const shiftRoutes = require("./src/routes/shiftRoutes");
const sheetsRoutes = require("./src/routes/sheetsRoutes");
const docsRoutes = require("./src/routes/docsRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const User = require("./src/models/User");
User.createManager();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/sheets", sheetsRoutes);
app.use("/api/docs", docsRoutes);
app.use("/api/reports", reportRoutes);

app.listen(5000);
