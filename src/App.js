import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'; //component사용 시 import 필수
import Customer from './components/Customer'
//App js를 통해 메인 자바스크립트 관리가 가능합니다.
//Index.js를 통해, root를 통해 index.html에서 아래 내용이 등장합니다.

const customer = [{
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
]
//map 함수를 활용하여 반복, 코드 길이를 줄일 수 있다. key를 사용해야 합니다.
//f12를 눌러서 크롬 브라우저에서 에러 확인 가능
class App extends Component {
  render(){
   return (
    <div>
      {
        //const에 정의된 customer에 대하여 알아서 반복해준다.
        customer.map(c => 
          {return( 
            <Customer 
              key = {c.id}
             id = {c.id}
             image = {c.image}
             name = {c.name}
             birthday = {c.birthday}
             job = {c.job}
             />
          )}
          )
      }
      {/* <Customer
        id = {customer[0].id}
        image = {customer[0].image}
        name = {customer[0].name}
        birthday = {customer[0].birthday}
        job = {customer[0].job}
      />
            <Customer
        id = {customer[1].id}
        image = {customer[1].image}
        name = {customer[1].name}
        birthday = {customer[1].birthday}
        job = {customer[1].job}
      />
            <Customer
        id = {customer[2].id}
        image = {customer[2].image}
        name = {customer[2].name}
        birthday = {customer[2].birthday}
        job = {customer[2].job}
      /> */}
      </div>
    );
  }
}


export default App;
