const {Router} =require('express')
const router = Router()
const {getCartPage,getCartIdPages,sendProductInTgBot } = require('../controllers/cartControllers')
 router.get('/cart/:id',getCartPage)
 router.get('/cart',getCartIdPages)
 router.get('/buy',sendProductInTgBot)

module.exports = router