const express = require('express')
const path  = require('path')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')
const connectDb = require('./config/mongodb')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const cors = require('cors')
const app = express()
dotenv.config()
connectDb()
//connect session 
const store = new MongoStore({
    collection:'session',
    uri: process.env.MONGO_URI
})
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    store
}))

app.use(flash())
app.use(cors())
app.use(express.static(path.join(__dirname,'public')))
app.engine('.hbs',exphbs({ extname:'.hbs' }))
app.set('view engine','.hbs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',require('./router/homeRouter'))
app.use('/auth',require('./router/authRouter'))
app.use('/shoping',require('./router/cartRoutes'))
app.use('/shoping',require('./router/contactRouts'))
app.use('/shoping',require('./router/shopRoutes'))
app.use('/shoping',require('./router/ShopDetail'))
app.use('/shoping',require('./router/reviewRoute'))
app.use('/admin',require('./router/adminRoute'))
app.use((req,res,next)=>res.status(404).render('404',{url:process.env.URL}))
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`server runing ${PORT}`))

