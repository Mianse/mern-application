const asyncHandler = require('express-async-handler') 
const Goal = require('../model/goalModel.js')
// @desc  getGoals
// @route GET /api/goals
//@access private
const getGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.find()
    res.status(200).json(goal)
})

// @desc  getGoals
// @route SET /api/goals
//@access private
const createGoal = asyncHandler(async (req,res)=>{
   if(!req.body.text){
    res.status(400)
    throw new Error('please add text field')
   }
   const goal = await Goal.create({
    text: req.body.text,
   })
   res.status(200).json(goal)
})

// @desc  updateGoals
// @route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('goal not found')
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

    await goal.deleteOne(); // Use .deleteOne() method

    res.status(200).json({ id: req.params.id });
});




module.exports = {
    getGoal,createGoal,deleteGoal,updateGoal
}