const posterModels = require("../models/posterModels");
const adminUser = require('../models/adminUser')
const ReviewModels = require('../models/reviewModels')
const allPostComments = require('../models/posterComments')
const carouselModel = require('../models/carouselModel')
const bcrypt = require('bcryptjs');
const { findByIdAndRemove, find } = require("../models/posterModels");
const adminLoginPage = async (req, res) => {
    try {
      
        res.render('admin/adminlogin')
    } catch (err) {
        console.log(err);
    }
}
const adminHomePage = async (req, res) => {
    
    const allProduct = await posterModels.find().lean()
    try {
            res.render('admin/adminhome',{
                  title:'adminhome',
                  url:process.env.URL,
                  allProduct:allProduct.reverse()
              })
            
    } catch (err) {
        console.log(err);
    }
}
const adminLogin = async(req,res)=>{
    try {
        const adminExcit = await adminUser.findOne({adminlogin:req.body.adminlogin})
        if(adminExcit){
            const matchAdminPassword = await bcrypt.compare(req.body.adminpassword,adminExcit.adminpassword)
            if(matchAdminPassword){
                req.session.adminusers = adminExcit,
                req.session.isAdminLogged = true,
                req.session.save(() =>{
                   res.redirect('/admin/adminhome')
                })

            }
        }
    } catch (err) {
        console.log(err);
    }
}
const newAddPost = async (req,res) => {
    try {
        const {productName,image,amount,descr,} = req.body
        await posterModels.create({
            productName,
            amount,
            image:'/uploads/'+req.file.filename,
            descr,
        })
      
           return res.redirect('/admin/adminhome')
    } catch (err) {
        console.log(err);
    }
}
const adminShop = async (req,res)=>{
    try {  
            return res.render('admin/adminshop',{
                 title:'adminshop'
             }) 
    } catch (error) {
        console.log(error);
    }
  
}
const adminShopUpdate = async(req,res)=>{
    try {
        const postById = await posterModels.findById(req.params.id).lean()
            return  res.render('admin/adminshopupdate',{
                  title:'Admin shop update',
                  postById,
              })
    } catch (err) {
        console.log(err);
    }
}
const updatePosterById = async  (req,res)=>{
    try {
        const posterupdateById = {
            productName:req.body.productName,
            amount:req.body.amount,
            image:'/uploads/'+req.file.filename,
            descr:req.body.descr,
            information:req.body.information
        }
        console.log(req.file);
        await posterModels.findByIdAndUpdate(req.params.id,posterupdateById)
        return res.redirect('/admin/adminhome')
    } catch (err) {
        console.log(err);
    }
}
const getAdminOnePage = async (req,res)=>{
    const onePoster = await posterModels.findById(req.params.id).lean()
    
    try {
        res.render('admin/adminonepage',{
            title:'adminonepage',
            url:process.env.URL,
            onePoster
        })
    } catch (err) {
        console.log(err);
    }
}
const deletedPostById = async (req,res)=>{
    try {
        await posterModels.findByIdAndRemove(req.params.id)
         res.redirect('/admin/adminhome')
    } catch (err) {
        console.log(err);
    }
}
const adminReview = async(req,res)=>{
        res.render('admin/adminrivew',{
            title:'review page',
            url:process.env.URL
        })
}
const reviewAdd = async(req,res)=>{
    const {reviewImg} = req.body
    await ReviewModels.create({
        reviewImg:"/uploads/"+req.file.filename
    })
    res.redirect('/admin/adminhome')
}
const adminlogout =(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}
const adminPostComments = async(req,res)=>{
    try {
        const postComments = await allPostComments.find().lean()
        console.log(postComments);
        res.render('admin/adminpostComments',{
            url:process.env.URL,
            title:'comments Page',
            postComments
        })
    } catch (error) {
        console.log(error);
    }
}
const deletedAdminComments = async (req,res)=>{
    try {
        await allPostComments.findByIdAndRemove(req.params.id)
        res.redirect('/admin/adminpostComments')
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    adminLoginPage,
    adminHomePage,
    newAddPost,
    adminLogin,
    adminShop,
    adminShopUpdate,
    updatePosterById,
    deletedPostById,
    adminlogout,
    adminReview,
    reviewAdd,
    adminPostComments,
    deletedAdminComments,
    getAdminOnePage
}