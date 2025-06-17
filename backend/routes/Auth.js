const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
var jwt= require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser');

const JWT_SECRET= "This is for a testing purpose"


//ROUTER 1: Create a user using POST: api/auth/createuser No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry! A user already exists with this email." });
        }
        const salt= await bcryptjs.genSalt(10);
        const securePassword = await bcryptjs.hash(req.body.password, salt);

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });

        const data={
            user:{
                id:user.id
            }
        }

        const authToken= jwt.sign(data,JWT_SECRET);

        res.json({success:true,authToken});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2: Authenticate a user using POST: api/auth/Login No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let success = false;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcryptjs.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 3: Get logged in user details using POST: api/auth/getuser. Login required

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
