const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

exports.signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    next(error)
  }

  const { email, password, name } = req.body
  try {
    const hashedPw = await bcrypt.hash(password, 12)
    const query = await db.query(
      `INSERT INTO users VALUES(
        DEFAULT,
        '${email}',
        '${hashedPw}',
        '${name}',
        extract(epoch from now()))
        RETURNING *`
    )

    res.status(201).json({ message: 'User created!', userNo: query.rows[0].user_no })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    // 사용자 확인
    const query = await db.query(`SELECT * FROM users WHERE user_email = '${email}' limit 1`)
    if (!query.rows[0]) {
      const error = new Error('A user with this email could not be found.')
      error.statusCode = 401
      throw error
    }
    const findUser = query.rows[0]

    const comparePw = await bcrypt.compare(password, findUser.user_password)
    if (!comparePw) {
      const error = new Error('Wrong password!')
      error.statusCode = 401
      throw error
    }

    // 토큰 생성
    const token = jwt.sign(
      {
        email: findUser.user_email,
        userId: findUser.user_no.toString(),
      },
      'secret',
      { expiresIn: '10h' }
    )

    res.status(200).json({
      token: token,
      userNo: findUser.user_no,
      email: findUser.user_email,
      name: findUser.user_name,
      expiration: new Date().getTime() / 1000 + 34600,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
