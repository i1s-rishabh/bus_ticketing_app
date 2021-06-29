
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { createUser } = require('../controllers/signup')


router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please write the valid email').isEmail(),
    check('password', 'Please enter the password 8 or more characters').isLength({ min: 8 }),
],createUser);

module.exports = router;