const User = require('../models/Users')
const config = require('config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { check, validationResult } = require('express-validator')


const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password} = req.body;

    try {

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] })
        }

        
        user = new User({
            name,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id,
            }
        }


        jwt.sign(payload,
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if (err) {
                    throw err
                }
                else {
                    res.status(200).json({ token });
                }

            }
        )
    } catch (err) {
        console.log(err.message);
       res.status(500).send('Server error');
    }

};


module.exports = { createUser };

