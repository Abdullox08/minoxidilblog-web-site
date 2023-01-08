const {model,Schema} = require('mongoose')

const productModel = new Schema({
    productName:{
        type:String,
        required:true,
    },
  
    descr:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
 
})
productModel.index({
    productName:'text',
    descr:'text'
})
productModel.statics = {
    searchPartial:function(q,callback){
        return this.find({
            $or:[
                {"productName":new RegExp(q,"gi")},
                {"descr":RegExp(q,"gi")}
            ]
        },callback)
    },
    searchFull:function(q,callback){
        return this.find({
            $productName:{$search:q,$caseSensitive:false}
        },callback)
    }
}
module.exports = model('Product',productModel)