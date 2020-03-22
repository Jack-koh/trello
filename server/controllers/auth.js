const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

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
    const user = new User({
      email,
      password: hashedPw,
      name
    })
    const respData = await user.save()
    console.log(respData)
    res.status(201).json({ message: 'User created!', userId: respData._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.login = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  try {
    // 사용자 확인
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
      const error = new Error('A user with this email could not be found.')
      error.statusCode = 401
      throw error
    }
    // 비밀번호 확인
    const comparePw = await bcrypt.compare(password, findUser.password)
    if (!comparePw) {
      const error = new Error('Wrong password!')
      error.statusCode = 401
      throw error
    }
    // 토큰 생성
    const token = jwt.sign(
      {
        email: findUser.email,
        userId: findUser._id.toString()
      },
      'secret',
      { expiresIn: '24h' }
    )
    // response
    res.status(200).json({
      token: token,
      userId: findUser._id.toString(),
      email: findUser.email,
      name: findUser.name,
      userNo: findUser.userNo,
      expiration: new Date().getTime() / 1000 + 86400
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
