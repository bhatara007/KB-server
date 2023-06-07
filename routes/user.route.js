const mongoose = require('mongoose'),
      express = require('express'),
      router = express.Router(),
      User = require('../model/User'),
      bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      auth = require('../middleware/auth')

//register
router.post("/register", async (req, res) => {
    try {

        const {firstName, lastName, email, password} = req.body;

        //check
        const existed = await User.findOne({email});

        if (existed) {
            return res.json({status: "failed"})
        }

        encrypytedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encrypytedPassword,
            order: [],
            addr: []
        })

        const token = jwt.sign( 
            { userId: user._id, email },
            process.env.TOKEN_KEY, 
            {
                expiresIn: '2h'
            }
        )

        user.token = token

        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(400).json({err: err})
    }
})

//login
router.post("/login", async (req, res) => {

    try{

        const {email, password} = req.body;

        const user = await User.findOne({email});

        console.log(await bcrypt.compare(password, user.password))

        if (user && (await bcrypt.compare(password, user.password))){

            const token = jwt.sign(
                { userId: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )

            user.token = token;

            res.status(200).json(user)
        }else{
            
            res.status(400).json("login failed")
        }



    }catch{

        res.status(400).send("Invalid request")

    }
    
})


router.get('/get-user', auth, async (req, res) => {

    const {userId} = req.user

    console.log(req.user);

    const data = await User.findById(userId)
    res.status(200).json(data)
})

router.put('/add-address', auth, async ( req, res, next) => {
    await User.findOneAndUpdate({_id: req.body._id}, {
        $set: {addr: req.body.addr}
    }, (error, data) => {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        }
        console.log("Address updated")
        res.status(200).json(data);
    })
})

module.exports = router