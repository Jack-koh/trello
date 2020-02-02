const express = require("express");
const boardController = require("../controllers/boards");

const router = express.Router();

router.post("/create", boardController.create);
router.get("/get", boardController.get);

module.exports = router;
