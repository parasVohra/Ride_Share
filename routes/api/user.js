const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// user Model
const User = require('../../modals/Users');

// @route   POST api/user
// @desc    Create a user
// @access  Public
router.post('/',(req, res) =>{
    const { firstName, lastName, email, password} = req.body;

    console.log(req.body);

    //simple validation 
    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields' })
    }

    //Check for exixting user

    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists' });

            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            });
       

            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user =>{
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
            })
   
        })
})

module.exports = router;