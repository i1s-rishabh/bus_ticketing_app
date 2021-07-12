
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const { createUser } = require('../controllers/signup');
const { login } = require('../controllers/login')
const { cancelTickets } = require('../controllers/tickets')
const auth = require('../middlewares/auth')

// api/users/signup  POST route
// @ public route

router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please write the valid email').isEmail(),
    check('password', 'Please enter the password 8 or more characters').isLength({ min: 8 }),
],createUser);

// api/users/login  POST route
// @ public route

router.post("/login",[
        check("email", "please include a valid email").isEmail(),
        check("password", "password is required").exists(),
],login)




router.delete("/user/:ticketId",auth,
cancelTickets
);





module.exports = router;