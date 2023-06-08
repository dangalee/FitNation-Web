const asyncHandler = require('express-async-handler') //개발자가 읽기 좋은 형태로 작성, 비동기 처리
const jwt = require('jsonwebtoken') //로그인한 유저가 계속 로그인 한 상태로 돌아다닐 수 있게 하는 모듈
const bcrypt = require('bcryptjs') //비밀번호 암호화 모듈
const User = require('./db')

//회원가입 프로세스
const registerUser = asyncHandler(async (req,res) => {
    const {name,role,email,username,password } = req.body

    if(!name || !role || !email || !username || !password){
        res.status(400)
        throw new Error('Please add all fields')}
    
    //1. 유저가 이미 존재하는 지 확인
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('email already exists.')
    }

    //2. bcrypt를 사용하여 사용자 비밀번호 암호화 하기
    //암호화 하지 않고 저장하는 것은 불법
    //암호화는 개인정보가 타인에게 노출, 유출되더라도 그 내용 확인을 어렵게 하는 보안 기술
    const salt = await bcrypt.genSalt()//default 10, 값이 높아질 수록 보안이 되지만 확인이 느려짐, 임의의 문자열 salt생성
    const hashedPassword = await bcrypt.hash(password,salt)

    //3. 유저생성하기
    const user = await User.create({
        name,
        role,
        email,
        username,
        password: hashedPassword
    })
    //4.성공과 실패 상태 전송하기
    if(user){
        //성공상태 201
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id) //generates an authentication token for the user id
        })
        } else{
            //실패
            res.status(400)
            throw new Error('Invalid user data')
        }



})

//로그인 프로세스
const loginUser = asyncHandler(async (req,res) => {

    const {email,password} = req.body

    //check for user email
    const user = await User.findOne({email})
    //get user role
    const role = await user.role

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)//generates an authentication token for the user id

        })
    
    }
    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})
module.exports = {
    registerUser,
    loginUser}