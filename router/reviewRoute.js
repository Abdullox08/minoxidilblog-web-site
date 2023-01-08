const {Router} = require('express')
const route = Router()
const {reviewController} = require('../controllers/reviewController')
route.get('/review',reviewController)

module.exports = route