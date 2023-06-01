const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000; //5000번 포트로 서버 열기
//노드js 익스프레스js 기본 코드

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id' : 1,
            'name': '홍길동',
            'image': 'https://placeimg.com/64/64/1',
            'birthday': '880222',
            'job': '학생'
          },
          {
            'id' : 2,
            'name': '이순신',
            'image': 'https://placeimg.com/64/64/2',
            'birthday': '880222',
            'job': '학생'
          },
          {
            'id' : 3,
            'name': '대조영',
            'image': 'https://placeimg.com/64/64/3',
            'birthday': '880222',
            'job': '학생'
          }

    ])
});
//서버가 동작 중이면 동작 중이라고 출력
app.listen(port, () => console.log(`Listening on port ${port}`))