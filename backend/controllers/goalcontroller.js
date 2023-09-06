const asyncHandler = require('express-async-handler') 
const Goal = require('../model/goalModel.js')
const User = require('../model/userModel.js')
// @desc  getGoals
// @route GET /api/goals
//@access private
const getGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.find({user: req.user.id})
    res.status(200).json(goal)
})

// @desc  getGoals
// @route SET /api/goals
//@access private

const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('please add text field');
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    });
    res.status(200).json(goal);
});

// @desc  updateGoals
// @route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }
    const user = await User.findById(req.user.id)
    // check if user exist
    if(!user){
        res.status(400)
        throw new Error("user not found")
    }
    //make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('user not authorized');
    }
    
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    })

    res.status(200).json(updatedGoal)
})

// @desc  deleteGoals
// @route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    const user = await User.findById(req.user.id)
    // check if user exist
    if(!user){
        res.status(400)
        throw new Error("user not found")
    }
    //make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('user not authorized');
    }
    
    await goal.deleteOne(); // Use .deleteOne() method

    res.status(200).json({ id: req.params.id });
});




module.exports = {
    getGoal,createGoal,deleteGoal,updateGoal
}