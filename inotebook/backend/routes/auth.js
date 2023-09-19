
// const express = require('express');
// const User = require('../models/User');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt=require('jsonwebtoken');

// const JWT_SECRET="shubhamisnice";
// //authenication
// router.post(
//     '/register',
//     [
//         body('username', 'Enter a valid name').isLength({ min: 3 }),
//         body('email', 'Enter a valid email').isEmail(),
//         body('password').isLength({ min: 5 }),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);

//         let user = await User.findOne({ email: req.body.email });

//         console.log(user);
//         if (user) {
//             return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
//         }

//         try {
//             const salt = await bcrypt.genSalt(10); // Generate the salt
//             const secPass = await bcrypt.hash(req.body.password, salt); // Hash the password

//             const { username, email } = req.body;

//             // Create a new user instance
//             const newUser = new User({
//                 username,
//                 email,
//                 password: secPass,
//             });

//             // const data={
//             //     user:{
//             //         id:user._id
//             //     }
//             // }
//             // const jwtData=jwt.sign(data, JWT_SECRET);
//             // console.log(jwtData);

//             // Save the user to the database
//             await newUser.save();

//             res.status(201).json({ message: 'User registered successfully' });
//         } catch (error) {
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             console.error(error);
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }
// );


// //login
// router.post(
//     '/login',
//     [
//         body('email', 'Enter a valid email').isEmail(),
//         body('password','Password cannot be blank').exists(),
//     ],
//     async (req, res) => {

//         const errors=validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const {email,password}=req.body;
//         try {
//             let user=User.findOne({email:email});
//             if(!user){
//                 return res.status(400).json({error:"Sorry try using valid credentials."});
//             }
//             const passwordCompare=await bcrypt.compare(password,user.password);
//             if(!passwordCompare){
//                 return res.status(400).json({error:"Sorry try using valid credentials."});
//             }
//             const payload={
//                 user:{
//                     email,
//                     password
//                 }

//             }
//             res.status(201).json({ message: 'User logged in.' });

//         } catch (error) {
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }

//             console.error(error);
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     })

// module.exports = router;
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "shubhamisnice";

// Registration route
router.post(
    '/register',
    [
        body('username', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            const { username, email } = req.body;

            const newUser = new User({
                username,
                email,
                password: secPass,
            });

            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

// Login route
router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        try {
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            // Use await to get the user object
            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json({ error: "Sorry, try using valid credentials." });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res.status(400).json({ error: "Sorry, try using valid credentials." });
            }

            // Sign a JWT token and send it in the response
            const payload = {
                user: {
                    id: user._id,
                },
            };

            const jwtToken = jwt.sign(payload, JWT_SECRET);

            res.status(201).json({ message: 'User logged in.', token: jwtToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

module.exports = router;
