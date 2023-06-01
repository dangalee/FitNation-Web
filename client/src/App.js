import logo from './logo.svg';
import './App.css';
import './muiStyle.css';
import React, {Component} from 'react'; //component사용 시 import 필수
import Paper from '@mui/material/Paper';
import Customer from './components/Customer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
//material ui에 가면 더 많은 테이블들에 대한 코드 정보가 있습니다.
import TableHead from '@mui/material/TableHead';
// import {withStyles} from '@mui/styles' react 18에서 사용불가
//App js를 통해 메인 자바스크립트 관리가 가능합니다.
//Index.js를 통해, root를 통해 index.html에서 아래 내용이 등장합니다.


//아래와 같은 코드는 react18에서 사용할 수 없기에 muiStyle.css파일생성
// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit *3,
//     overflowX: "auto"
//   },
//   table: {
//     minWidth: 1080
//   }
// })

//하드코딩 comment out
// const customer = [{
//   'id' : 1,
//   'name': '홍길동',
//   'image': 'https://placeimg.com/64/64/1',
//   'birthday': '880222',
//   'job': '학생'
// },
// {
//   'id' : 2,
//   'name': '이순신',
//   'image': 'https://placeimg.com/64/64/2',
//   'birthday': '880222',
//   'job': '학생'
// },
// {
//   'id' : 3,
//   'name': '대조영',
//   'image': 'https://placeimg.com/64/64/3',
//   'birthday': '880222',
//   'job': '학생'
// }
// ]
//map 함수를 활용하여 반복, 코드 길이를 줄일 수 있다. key를 사용해야 합니다.
//f12를 눌러서 크롬 브라우저에서 에러 확인 가능


class App extends Component {

  state = {
    //component 내에서 변경 가능
    customers : []
  }
  componentDidMount() {
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
  
  }
  //비동기적으로 업무 수행
  callApi = async () => {
    const response = await fetch('api/customers'); //api에서 데이터를 받아와서
    const body = await response.json(); //고객 목록이 json형태로 body변수에 들어감
    return body;//body반환하여, componentdidmount함수에 전달
  }
  render(){
    // const {classes} = this.props;
   return (
    <Paper className = "root">
        {/* const에 정의된 customer에 대하여 알아서 반복해준다. */}
        <Table className = "table">
          <TableHead>
            <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {this.state.customers ? this.state.customers.map(c =>
            {return( 
              <Customer 
                key = {c.id}
                id = {c.id}
                image = {c.image}
                name = {c.name}
                birthday = {c.birthday}
                job = {c.job}
                />
            )} ) : ""}
  
        </TableBody>

        </Table>
{/* 
      /* <Customer
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
      /> */ }
      </Paper>
    
    );
  }
}


export default App;
    /*
    package.jsonn outside of client 폴더
        클라이언트 폴더에서 클라이언트 모듈 생성
    루트 폴드에서는 서버 모듈을 생성하도록 명시
    서버와 클라이언트 즉 백엔드와 프론트엔드를 동시에 시작할 수 있도록 한다.
    */