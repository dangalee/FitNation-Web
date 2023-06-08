const mongoose = require('mongoose')

//schema 생성하기
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name']
    },
    role:{
        type: String,
        required: [true, 'Please select a role']
    },
    email:{
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    username:{
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please add a password']
    }
}, 
{
    timestamps: true
})

//정의된 스키마를 모델처럼 사용할 수 있도록 한다.
module.exports = mongoose.model('User', userSchema)
