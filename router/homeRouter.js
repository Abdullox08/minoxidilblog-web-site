const {Router} = require('express')
const router = Router()
const {getHomePage} = require('../controllers/homeControlers')
router.get('/',getHomePage)

module.exports = router
