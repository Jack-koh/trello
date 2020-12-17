const express = require('express')
const { body } = require('express-validator')
const db = require('../db')

const authController = require('../controllers/auth')
const router = express.Router()

router.put('/signup', authController.signup)
router.post('/login', authController.login)

module.exports = router

// [
//   body('email')
//     .isEmail()
//     .withMessage('Please Enter a valid email.')
//     .custom((value, { req }) => {
//       return db.query(`SELECT * FROM users WHERE user_email = '${value}' limit 1`).then((res) => {
//         if (res.rows[0]) {
//           return Promise.reject('E-Mail address alreay exists!')
//         }
//       })
//     })
//     .normalizeEmail(),
//   body('password').trim().isLength({ min: 5 }),
//   body('name').trim().isLength({ min: 1 }),
// ]
