const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; //5000번 포트로 서버 열기
//노드js 익스프레스js 기본 코드

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/hello', (req, res) => {
    res.send({message: "Hello Express!"});
});
//서버가 동작 중이면 동작 중이라고 출력
app.listen(port, () => console.log(`Listening on port ${port}`))