const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/user')
const router = express.Router();
const bcrypt = require('bcryptjs')
const fetchuser  = require('../middleware/fetchuser')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "skippersenani$money";

//ROUTE_2: create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Oops wrong password").isLength({ min: 5 }),
], async (req, res) => {
    // if error occurs retrun bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check whether the email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Email Already Exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const Data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(Data, JWT_SECRET);
        res.json({authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured")
    }
})


//ROUTE_2: Authenticate user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Oops wrong password").isLength({ min: 5 }),
], async (req, res)=>{
    // if error occurs retrun bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // find user
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if(!passCompare){
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const Data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(Data, JWT_SECRET);
        res.json({authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error Occured!!")  
    }

//ROTUE_3: Get the logged in user details using: POST "api/auth/getuser". login required

router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error!!")
    }
})



})


module.exports = router;