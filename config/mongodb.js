const mongoose = require('mongoose')

const connectDb = async ()=>{
    const connecting = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    console.log(`connecting mongodb ${connecting.connection.host}`);
}
module.exports = connectDb