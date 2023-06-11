const Users = require('./userModel');
const asyncHandler = require('express-async-handler') //비동기 처리를 하지 않으면 로그인 진행 불가함 findOne이 항상 null 값을 반환함

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