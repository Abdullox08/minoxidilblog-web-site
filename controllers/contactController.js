const getContactPage =async (req,res)=>{
    try {
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
       return res.render('shoping/contact',{
            title:"shoping contact",
            url:process.env.URL,
            user:req.session.user,
            islogged:req.session.islogged,
            multiLang:req.session.lang
        })
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    getContactPage
}