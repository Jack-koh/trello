const express = require("express");
const cardController = require("../controllers/card");
const router = express.Router();

router.post("/create", cardController.create);

module.exports = router;
