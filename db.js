const mongoose = require('mongoose') //mongoose 모듈 불러오기
const connectDB = async() => {
    try{

        const conn = await mongoose.connect('mongodb://127.0.0.1:27017')
        //console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

    } catch (error){
        console.log(error);
        process.exit(1)
    }

}


module.exports = connectDB
