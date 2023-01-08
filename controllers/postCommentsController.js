const poseterComments = require('../models/posterComments')


const addposterComments = async (req,res)=>{
    try {
        const oneProductById = req.url
        let text = oneProductById
        let a = text.substring(11)
      const {commentsBody,commentsUserName, commentsEmail,} = req.body
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
        await poseterComments.create({
            commentsBody,
            commentsEmail,
            commentsUserName,
        })
        res.redirect('/shoping/detail/'+a)
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    addposterComments,
}