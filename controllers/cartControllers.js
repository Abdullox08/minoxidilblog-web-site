const Product = require('../models/posterModels')
const getCartPage = async (req,res)=>{
    try {
        const posterId = await Product.findById(req.params.id).lean()
        const resLang = req.query.lang
        const languz = require('../lang/languz')
        const langru = require('../lang/langru')
        if(resLang === 'uz'){
            req.session.lang = languz
            req.session.save(err=>{
                if(err) throw err
            })
        }
        if(resLang === 'ru'){
            req.session.lang = langru
            req.session.save(err=>{
                if(err) throw err
            })
        }
       return res.render('shoping/cart',{
            title:"shoping cart",
            url:process.env.URL,
            user:req.session.user,
            posterId,
            islogged:req.session.islogged,
            multiLang:req.session.lang
        })
    } catch (err) {
        console.log(err);
    }
}
const getCartIdPages = async (req,res)=>{

    try {
        res.render('shoping/cart',{
            url:process.env.URL,
            user:req.session.user,
            islogged:req.session.islogged,
            title:'cart page',
            multiLang:req.session.lang
        })
    } catch (err) {
        console.log(err);
    }
}
var lib = require("tele-bot-api")
var option = {
  bot_path : "/botapi", 
  port: 7000 
}
var tg = new lib.telegram("5484954727:AAGQGprWjpdunAm905xQWUOMPDExvUU7S6I", option)
async function test(productOne,userPhone,userUsername) {
  var data = {
    chat_id: 1106641717,
    text: `
     ${userPhone}
     ${userUsername}
     ${productOne.productName}
     ${productOne.amount}
     `,
    
  }
  return tg.api.request("sendMessage", data)
}
const sendProductInTgBot = async(req,res)=>{
    try {
      const productOne = await Product.findOne().lean()
      const user = req.session.user
      const userPhone = user.phone 
      const userUsername = user.firstname
        console.log(userPhone);
        res.render('shoping/buy',{
          title:'shoping buy ',
          user:req.session.isogged,
          username:req.session.user,
          url:process.env.URL,
          productOne,
          multiLang:req.session.lang
          
        })
        test(productOne,userPhone,userUsername)

        
    } catch (err) {
    }
}
module.exports = {
    getCartPage,
    getCartIdPages,
    sendProductInTgBot
}