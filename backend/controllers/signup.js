const User = require('../models/Users')
const config = require('config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { check, validationResult } = require('express-validator')


const validations = (req)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        const err = {
            error:'Please enter the password 8 or more characters',
            status:400
        }
        return err
    }
    else{
        return false
    }
    
}

const createUser = async (req, res, next) => {

    const errors = await validations(req)
    console.log(errors)
    if(errors){
        return next(errors)
    }

    const { name, email, password,isAdmin} = req.body;

        let user = await User.findOne({ email })
        if (user) {
            return next({status:400, error: { msg: "User already exists" } })
        }

        user = new User({
            name,
            email,
            password,
            isAdmin
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
                  return res.status(200).json({ token });
                }

            }
        )
};
module.exports = { createUser };

