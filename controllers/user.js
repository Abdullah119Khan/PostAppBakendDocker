const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email })
    if(!user) return res.status(404).json({ message: "User not found"})

    const originalPassword = bcrypt.compareSync(password, user.password)
    if(!originalPassword) return res.status(403).json({ message: "Password not match!!!"})

    const token = jwt.sign({ id: user._id, email: user.email}, 'test', { expiresIn: '1h'})

    return res.status(200).json({ token, result: user })
  } catch(err) {
    return res.status(500).json(err)
  }
}

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email: email })
    if(user) return res.status(403).json({ message: 'User aleardy exist'})

    const hashPass = bcrypt.hashSync(password, 12)

    if(password !== confirmPassword) return res.status(403).json({ message: 'Password not match!!'})

    const newUser = await User.create({ email, password: hashPass, name: `${firstName} ${lastName}`})

    const token = jwt.sign({ id: newUser._id, email: newUser.email}, 'test', { expiresIn: '1h' })

    return res.status(201).json({ token, result: newUser })

  } catch(err) {
    return res.status(500).json(err)
  }
}