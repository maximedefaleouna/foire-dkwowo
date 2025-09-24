const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const articleController = require("../controllers/ArticleController");

router.post("/", authMiddleware.verifyToken, (req, res) =>
  articleController.create(req, res)
);
router.get("/", (req, res) => articleController.getAll(req, res));
router.get("/:id", (req, res) => articleController.getOne(req, res));
router.put("/:id", authMiddleware.verifyToken, (req, res) =>
  articleController.update(req, res)
);
router.delete("/:id", authMiddleware.verifyToken, (req, res) =>
  articleController.delete(req, res)
);

module.exports = router;
