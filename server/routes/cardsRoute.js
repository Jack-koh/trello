const express = require('express')
const cardsController = require('../controllers/cards')
const router = express.Router()

router.post('/create', cardsController.create)
router.put('/drag', cardsController.drag)
router.put('/update', cardsController.update)
router.delete('/delete', cardsController.delete)

module.exports = router
