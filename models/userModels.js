const {model,Schema} = require('mongoose')
const userModels = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    password1:{
        type:String,
        required:true,
        minLenght:6
    },

})
// userModels.pre('save', async function(){
//     const salt = await bcrypt.genSalt(10)
//     this.password1 = await bcrypt.hash(this.password1, salt)
// })
module.exports = model("User",userModels)