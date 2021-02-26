const express = require('express');
const { Goal } = require('../models/Goal');
const router = express.Router();

// GET/LIST
// http://localhost:3000/api/v1/categories
router.get(`/`, async (req, res) => {
    const goalList = await Goal.find();
    // If goalList isn't returned send an error
    if(!goalList) {
        res.status(500).json({success: false})
    }
    res.send(goalList);
});

// CREATE/POST
// http://localhost:3000/api/v1/categories
router.post(`/`, (req, res) => {
    const goal = new Goal({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline
    });
    goal.save().then((createdGoal => {
        res.status(201).json(createdGoal)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
});

//GET:ID
//http://localhost:3000/api/v1/categories/:id
router.get('/:id', async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal) {
        res.status(500).json({ success: false, message: 'Goal not found'})
    }
    res.status(200).send(goal);
})

//DELETE
//http://localhost:3000/api/v1/categories/:id
router.delete('/:id', (req, res) => {
    Goal.findByIdAndRemove(req.params.id).then(goal => {
        if(goal) {
            return res.status(200).json({success: true, message: 'The goal has been deleted'});
        } else {
            return res.status(404).json({
                success: false,
                message: 'Goal not found'
            })
        }
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err })
    })
})

// UPDATE
//http://localhost:3000/api/v1/categories/:id
router.put('/:id', async (req, res) => {
    const goal = await Goal.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline
        }, 
        { new: true }
    )
    if(!goal)
        return res.status(500).send('Goal not found')
    res.send(goal);
})


module.exports = router;
