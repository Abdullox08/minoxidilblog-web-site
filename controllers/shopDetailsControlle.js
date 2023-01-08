const Product = require('../models/posterModels')
const poseterComments = require('../models/posterComments')
const getShopDetailPage =async (req,res)=>{
    try {
        const productAll = await Product.find().lean()
        const postComments = await poseterComments.find().lean()
        const oneProductRendering = await Product.findById(req.params.id).lean()
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
       return res.render('shoping/detail',{
            title:"shoping detail",
            user:req.session.user,
            islogged:req.session.islogged,
            url:process.env.URL,
            oneProductRendering,
            productAll,
            postComments,
            multiLang:req.session.lang
        })
    } catch (err) {
        console.log(err);
    }
}
const getOneIdDetailPage = async (req,res)=>{
    try {
        
        
        res.render('/shoping/detail',{
            url:process.env.URL,
            title:'Shop detail',
            multiLang:req.session.lang
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getShopDetailPage,
    getOneIdDetailPage,
}