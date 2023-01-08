const {model,Schema} = require('mongoose')


const carouselModel = new Schema({
    firstImage:{
        type:String,
        required:true
    },
    lastImage:{
        type:String,
        required:true
    },
    secondImage:{
        type:String,
        required:true
    }
})

module.exports = model('carouselImage',carouselModel)