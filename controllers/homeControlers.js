const Product = require('../models/posterModels')

const getHomePage = async (req,res)=>{
    try {
        const product = await Product.find().lean()
        const productId = await Product.findById(req.params.id).lean()
        const langru = require('../lang/langru')
        const languz = require('../lang/languz')
        const langValue = req.query.lang
        req.session.lang = languz
        req.session.save(err=>{
            if(err)throw err
        })
        if(langValue === 'ru'){
            req.session.lang = langru
            req.session.save(err=>{
                if(err)throw err
            })
        }
        if(langValue === 'uz'){
            req.session.lang = languz
            req.session.save(err=>{
                if(err)throw err
            })
        }
            res.render('home',{
                title:'home page',
                user:req.session.user,
                islogged:req.session.islogged,
                product:product.reverse(),
                url:process.env.URL,
                multiLang:req.session.lang,
            })
    } catch (err) {
        console.log(err);
    }
}
module.exports ={
    getHomePage
}