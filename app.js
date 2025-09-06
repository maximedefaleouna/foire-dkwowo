const express = require("express");
const standRequestRoutes = require("./src/routes/standRequest.routes");

const app = express();

app.use(express.json());
app.use("/api/stand-requests", standRequestRoutes);

module.exports = app;
