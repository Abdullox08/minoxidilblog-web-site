const User = require('../models/userModels')
const bcrypt = require('bcryptjs')
const getLoginPage = async (req, res) => {
    try {
        if (!req.session.islogged) {
            res.render('auth/login', {
                title: 'login page',
                url: process.env.URL,
                LoginError: req.flash('loginError')
            })
            
        }
    } catch (err) {
        console.log(err);
    }

}
const getSignUpPage = async (req, res) => {
    try {
        if (!req.session.islogged) {

            res.render('auth/signup', {
                title: 'login page',
                url: process.env.URL,
                regError: req.flash('regerror')
            })
        }
    } catch (err) {
        console.log(err);
    }
}
const registerNewUser = async (req, res) => {
    try {
        const { email, firstname, lastname, phone, password1, password2 } = req.body
        const salt = await bcrypt.genSalt(10)
        const passwordhash = await bcrypt.hash(password1, salt)
        const userExcit = await User.findOne({ email:req.body.email })
        if (userExcit) {
            req.flash('regerror', "siz bu sitedan allaqochon ro`yhatdan o`tib bo`lgansiz")
            return res.redirect('/auth/signup')
        }
        if (!password1 === password2) {
            req.flash('regerror', "parrollar mos kelmayapti")
            // req.session.save((e)=>{
            //     if(e) throw e
            //     return res.redirect('/shoping/shop')
            // })
            return res.redirect('/auth/signup')
        }
        res.redirect('/auth/login')
        await User.create({
            email,
            firstname,
            lastname,
            phone,
            password1: passwordhash,
        })
    } catch (err) {
        console.log(err);
    }
}
const loginUser = async (req, res) => {
    try {
        const userExcit = await User.findOne({ email: req.body.email })
        const password2 = await User.findOne({password2:req.body.password2} )
        const passwordConfirim = await User.findOne({password1:req.body.password1} )
        if (userExcit) {
            console.log(userExcit);
            const matchPassword = await bcrypt.compare(req.body.password1, userExcit.password1)
            if (matchPassword) {
                req.session.user = userExcit
                req.session.islogged = true
                req.session.save(err => {
                    if (err) throw err
                    res.redirect('/shoping/shop')
                })
            } else {
                req.flash('loginError', 'Login yoki parol no`tog`ri')
                res.redirect('/auth/login')
            }
            if (passwordConfirim !== password2) {
                req.flash('loginError','Parol mos kelmadi')
                return res.redirect('/auth/reg')
            }
        } else {
            req.flash('loginError', 'bunday foydalanuvchi ro`yhatda yo`q')
            res.redirect('/auth/login')
        }

    } catch (err) {
        console.log(err);
    }
}
const logOut =  (req,res) =>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}
module.exports = {
    getLoginPage,
    getSignUpPage,
    registerNewUser,
    loginUser,
    logOut
}