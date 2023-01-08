const {Router} = require('express')
const adminRoute = Router()
const upload = require('../utils/uploadFile')
const {protectedAdmin} = require('../middlewares/auth')
const {
    adminLoginPage,
    adminHomePage,
    newAddPost,
    adminLogin, 
    adminShop,
    adminShopUpdate,
    updatePosterById,
    deletedPostById,
    adminlogout,
    adminReview,
    reviewAdd,
    adminPostComments,
    deletedAdminComments,
    getAdminOnePage
} = require('../controllers/adminControllers')
adminRoute.get('/adminlogin',adminLoginPage)
adminRoute.get('/adminlogout',adminlogout)
adminRoute.get('/adminhome',protectedAdmin, adminHomePage)
adminRoute.get('/adminshop',protectedAdmin, adminShop)
adminRoute.get('/adminshopupdate/:id',protectedAdmin, adminShopUpdate)
adminRoute.post('/adminpostupdatebyid/:id',protectedAdmin,upload.single('image'), updatePosterById)
adminRoute.post('/adminhome',adminLogin)
adminRoute.post('/posteradd',upload.single('image'),protectedAdmin, newAddPost)
adminRoute.post('/postdeleted/:id', protectedAdmin,deletedPostById)
adminRoute.get('/adminrivew',protectedAdmin,adminReview)
adminRoute.post('/reviewAdd',protectedAdmin,upload.single('reviewImg'), reviewAdd)
adminRoute.get('/adminpostComments',protectedAdmin,adminPostComments)
adminRoute.post('/adminpostComments/:id',protectedAdmin,deletedAdminComments)
adminRoute.get('/adminonepage/:id',protectedAdmin,getAdminOnePage)
module.exports = adminRoute