const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:'./public/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' +Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage,
    limits:{fileSize:10000000},
    fileFilter:function(req,file,cb){
        checkImgType(file,cb)
    }
})


function checkImgType(file,cb){
const fileTypes = /.jpeg|.jpg|.png|.webp/
const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
const mimetype = fileTypes.test(file.mimetype)

if(extname && mimetype){
    return cb(null,true)
}else{
    cb('Error:siz fata bu yerga img yuklay olasiz')
}
}
module.exports = upload