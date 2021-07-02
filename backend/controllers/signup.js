const User = require('../models/Users')
const config = require('config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const { body, validationResult } = require('express-validator')

const validation = (req)=>{

}


const createUser = async (req, res, next) => {
    console.log(req.body)
    // const errors = validationResult(req);
    const errors = req.body.password.length<1? true:false 
    
    if (errors) {
        console.log(errors,"errors")
        const err = new Error({error:"password invalid",
    })
        return next(err)
        // return res.status(400).json({ error:'password' })
    }

    const { name, email, password} = req.body;

    try{
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
                  return res.status(200).json({ token });
                }

            }
        )
    }catch(err){
        return res.status(500).send("server error")
    }
};
module.exports = { createUser };

