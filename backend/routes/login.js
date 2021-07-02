const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const config = require('config')
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const router = express.Router();


// POST api/users

router.post('/', [
    check('email', 'Please write the valid email').isEmail(),
    check('password', 'Password is required').exists()
],
);

module.exports = router;
