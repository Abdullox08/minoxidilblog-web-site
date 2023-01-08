const reviewModels = require('../models/reviewModels')

const reviewController = async (req,res)=>{
    const reviewAll = await reviewModels.find().lean()
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
        res.render('shoping/review',{
            title:"Review page",
            url:process.env.URL,
            user:req.session.user,
            reviewAll,
            multiLang:req.session.lang
        })
}

module.exports ={
    reviewController
}