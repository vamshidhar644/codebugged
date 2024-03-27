const express = require('express');
const UserData = require('../models/user');

const router = express.Router();

const { signup, login } = require('../controllers/user');

// login / signup route

router.post('/login', login);

router.post('/signup', signup);

module.exports = router;
