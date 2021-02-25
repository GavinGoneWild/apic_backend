const express = require('express');
const {User} = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');

// GET/LIST
// http:localhost:3000/api/v1/users
router.get(`/`, async (req, res) => {
    const userList = await User.find();
    if(!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList);
});

// GET/ID
// http:localhost:3000/api/v1/users
router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        res.status(500).json({success: false})
    }
    res.send(user);
});

// CREATE/POST
// http:localhost:3000/api/v1/users
router.post(`/`, async (req, res) => {
    console.log('creaing user');
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender
    });
    user = await user.save();
    if(!user) 
        return res.status(500).json({
            error: err,
            success: false
        })
    res.send(user);
});

//DELETE
//http://localhost:3000/api/v1/users/:id
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if(user) {
            return res.status(200).json({success: true, message: 'The user has been deleted'});
        } else {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err })
    })
})

// UPDATE/GALLERY
router.put("/:id", async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            res.send("Invalid user id");
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender
            },
            {new: true}
        )

        if (!user)
            return res.status(500).send("The product can not be created");
        res.send(user);
    }
);

module.exports = router;