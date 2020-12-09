const express = require('express')
const trellosController = require('../controllers/trellos')
const router = express.Router()

router.get('/get', trellosController.get)
router.post('/create', trellosController.create)
router.put('/update', trellosController.update)
router.delete('/delete', trellosController.delete)
router.put('/drag', trellosController.drag)

module.exports = router
