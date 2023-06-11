const mongoose = require('mongoose') //mongoose 모듈 불러오기

const userSchema = mongoose.Schema({

    //_id는 생략해도 알아서 생성
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
})
//유저스키마를 users로 추가하고 model화, 이제부터 Users로 접근가능
module.exports = mongoose.model('users', userSchema)
