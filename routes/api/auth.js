const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')


// user Model
const User =require('../../modals/Users');


// @route   POST api/auth
// @desc    user login
// @access  Public
router.post('/',(req, res) =>{
    const { email, password} = req.body;

    console.log(req.body);

    //simple validation 
    if(!email || !password){
        return res.status(400).json({msg:'Please enter all fields'})
    }

    //Check for exixting user

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg:'User does not exists'});

        
          // validate password 
          bcrypt.compare(password, user.password)
          .then(isMatch => {
                if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) =>{
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id: user.id,
                                firstName: user.firstName,
                                email: user.email
                            }
                        })
                    }
                )
            })
        })
    
});

// @route   GET api/auth/user
// @desc    Get User Data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router;