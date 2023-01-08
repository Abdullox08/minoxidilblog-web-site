
const protectedAdmin =  (req, res,next) => {
    if (!req.session.isAdminLogged) {
       res.redirect('/')
    }
   next()
   
}

module.exports = {protectedAdmin}