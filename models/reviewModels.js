const {Schema,model} = require('mongoose')


const reviewModels = new Schema({
    reviewImg:{
        type:String,
        required:true
    }
})
module.exports = model('ReviewModels',reviewModels)