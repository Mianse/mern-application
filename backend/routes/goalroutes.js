const express = require('express')
const router = express.Router()
const {getGoal,createGoal,updateGoal,deleteGoal} = require('../controllers/goalcontroller.js')
const {protect} = require('../middleware/authniddleware.js')

router.route('/').get(protect,getGoal).post(protect,createGoal)
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)


module.exports = router