const express = require("express");
const router = express.Router();
const controller = require("../controllers/StandRequestController");

router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.list(req, res));
router.post("/:id/validate", (req, res) => controller.validate(req, res));

module.exports = router;
