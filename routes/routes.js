const express = require('express')

// router object
const router = new express.Router()
const user=require('../controllers/userController')
const { jwtMiddleware, jwtRoleMiddleware } =require('../middlewares/jwtMiddleware')

const { createUser, loginUser } = require('../middlewares/validationMiddleware');
// User creation
router.post('/signup',createUser ,user.signUp)
// login
router.post('/signin',loginUser,user.login)
// student list
router.get('/students',jwtRoleMiddleware,user.getStudents)
// edit user
router.put('/student/:_id',jwtMiddleware, user.edit)
// delete 
router.delete(`/student/:_id`,jwtRoleMiddleware,  user.delete)
//Login  View  student
router.get(`/student`, jwtMiddleware, user.getAuthUser);
// Accept User
router.put('/student/accept/:_id',jwtRoleMiddleware, user.accept)
// Reject User
router.put('/student/reject/:_id',jwtRoleMiddleware, user.reject)
module.exports = router