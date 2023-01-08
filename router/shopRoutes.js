const {Router} =require('express')
const router = Router()
const {getShopPage,} = require('../controllers/shopControllers')
 router.get('/shop',getShopPage)

module.exports = router