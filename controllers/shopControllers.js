const Product = require('../models/posterModels')
const getShopPage =async (req,res)=>{
    try {
        if (req.query.search) {
            const { search } = req.query
            const posterAll = await Product.searchPartial(search, (err, data) => {
                if (err) throw new Error
            }).lean()
        
            return res.status(200).render('shoping/searchResults', {
                title: 'Search page',
                user: req.session.islogged,
                posterAll: posterAll.reverse(),
                querySearch:req.query.search,
                url: process.env.URL,
                multiLang:req.session.lang
            })
        }
        const posterAll = await Product.find().lean()
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
       return res.render('shoping/shop',{
            title:"shoping shop",
            posterAll:posterAll.reverse(),
            user:req.session.user,
            islogged:req.session.islogged,
            url:process.env.URL,
            multiLang:req.session.lang
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getShopPage,
}