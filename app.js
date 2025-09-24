const express = require("express");
const standRequestRoutes = require("./src/routes/standRequest.routes");
const authRoutes = require("./src/routes/auth.routes");
const articleRoutes = require("./src/routes/article.routes");

const app = express();

app.use(express.json());
app.use("/api/stand-requests", standRequestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/article", articleRoutes);

module.exports = app;
