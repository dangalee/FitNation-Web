const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db')
const app = express();
const port = process.env.PORT || 5000; //3000번 포트로 서버 열기
//노드js 익스프레스js 기본 코드

app.use(bodyParser.json()); //json형태의 전달. body-parser미들웨어를 통해 body부분을 원하는 대로 파싱하여 활용
app.use(bodyParser.urlencoded({extended:true}));
// app.use('/api/users', require('./userRoutes')) //라우터 객체를 app 객체에 등록

connectDB()




//서버가 동작 중이면 동작 중이라고 출력
app.listen(port, () => console.log(`Listening on port ${port}`))