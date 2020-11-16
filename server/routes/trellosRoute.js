const express = require("express");
const trelloController = require("../controllers/trello");
const router = express.Router();

router.post("/create", trelloController.create);
router.get("/get", trelloController.get);
router.put("/update", trelloController.update);
router.delete("/delete", trelloController.delete);

router.put("/update/cards", trelloController.updateCards);



module.exports = router;
