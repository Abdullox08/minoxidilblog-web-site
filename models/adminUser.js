const {model,Schema} = require('mongoose')
const bcrypt = require('bcryptjs')
const addAdminUser = new Schema({
    adminlogin:{
        type:String,
        required:true,
        unique:true,
    },
    adminpassword:{
        type:String,
        required:true
    }
})
addAdminUser.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.adminpassword = await bcrypt.hash(this.adminpassword, salt)
})

module.exports = model('AdminUser',addAdminUser)