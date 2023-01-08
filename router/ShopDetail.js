const {Router} =require('express')
const router = Router()
const {getShopDetailPage,} = require('../controllers/shopDetailsControlle')
const {addposterComments} =require('../controllers/postCommentsController')
 router.get('/detail',getShopDetailPage)
 router.get('/detail/:id',getShopDetailPage)
 router.post('/detailadd/:id',addposterComments)

module.exports = router