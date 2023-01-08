const {model,Schema} = require('mongoose')


const poseterComments = new Schema({
    commentsEmail:{
        type:String,
        required:true
    },
    commentsUserName:{
        type:String,
        required:true
    },
    commentsBody:{
        type:String,
        required:true
    },
    
})
module.exports = model('postComments',poseterComments)