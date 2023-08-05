const express = require('express')
const router = express.Router()
const {getGoal,createGoal,updateGoal,deleteGoal} = require('../controllers/goalcontroller.js')

router.route('/').get(getGoal).post(createGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)


module.exports = router