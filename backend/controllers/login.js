const User = require('../models/Users')
const config = require('config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { check, validationResult } = require('express-validator')

const login =async(req, res,next)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        console.log(req.body)
        try {
            let user =await User.findOne({ email}) ;
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            console.log(user.password)
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Credentials" }] 
                });
            }
            const payload = {
                user: {
                    id: user.id,
                    isAdmin:user.isAdmin
                },
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 40000 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token });
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).send("server error");
        }
    
}

module.exports = { login };
