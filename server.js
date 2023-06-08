const express = require('express');
const asyncHandler = require('express-async-handler') //비동기 처리를 하지 않으면 로그인 진행 불가함 findOne이 항상 null 값을 반환함
const bodyParser = require('body-parser');
const mongoose = require('mongoose') //mongoose 모듈 불러오기
const app = express();
const port = process.env.PORT || 5000; //3000번 포트로 서버 열기
//노드js 익스프레스js 기본 코드

app.use(bodyParser.json()); //json형태의 전달. body-parser미들웨어를 통해 body부분을 원하는 대로 파싱하여 활용
app.use(bodyParser.urlencoded({extended:true}));
// app.use('/api/users', require('./userRoutes')) //라우터 객체를 app 객체에 등록

const connectDB = async() => {
    try{

        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/', {dbName: 'test'})
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error){
        console.log(error);
        process.exit(1)
    }

}
connectDB()
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
var Users = mongoose.model('users', userSchema)

app.post('/api/register/', asyncHandler(async(req, res) => {
    const {name,role,email,username,password } = req.body

    
    //check if user exists
    const userExits = await Users.findOne({email})

    if(userExits){
        res.status(400)
        throw new Error('이미 존재하는 이메일입니다.')
    }
    const user =  await Users.create({
        name,
        role,
        email,
        username,
        password,
    })
    if(user){
        //회원가입 데이터 성공 처리를 의미 res.status(201)
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
           
        })
        } else{
            res.status(400)
            throw new Error('유효하지 않은 데이터입니다.')
        }
}))

app.post('/api/login/', asyncHandler(async (req, res) => {
    const {email,password} = req.body
    const found = await Users.findOne({email})
    console.log(password)
    console.log(found.password)
    console.log(password === found.password)
    if(found && (await password === found.password)){
        res.json({
            _id: found.id,
            name: found.name,
            username: found.username,
            email: found.email,
            role: found.role
        })
    
    }
    else{
        res.status(400)
        throw new Error('잘못된 아이디/비밀번호 입니다.')
    }
}))


//서버가 동작 중이면 동작 중이라고 출력
app.listen(port, () => console.log(`Listening on port ${port}`))