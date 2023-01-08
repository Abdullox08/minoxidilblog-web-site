const {Router} = require('express')
const router = Router()
const {
    getLoginPage,
    getSignUpPage,
    registerNewUser,
    loginUser,
    logOut
} 
= require('../controllers/authControllers')

router.get('/login',getLoginPage)
router.post('/login',loginUser)
router.get('/signup',getSignUpPage)
router.post('/signup',registerNewUser)
router.get('/logout',logOut)

module.exports =router