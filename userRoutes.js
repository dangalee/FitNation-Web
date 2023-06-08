const express = require('express')
const router = express.Router() //라우터 객체 잠조

const {registerUser, loginUser} = require('./userController')//userController내의 함수들 불러오기

router.post('/register', registerUser)

router.post('/login', loginUser) //요청경로 그리고 실행될 함수

module.exports = router;