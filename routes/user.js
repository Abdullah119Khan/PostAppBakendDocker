const express = require('express');
const { createUser, login } = require('../controllers/user');
const router = express.Router()

router.post('/user/login', login)
router.post('/user/create', createUser)

module.exports = router;