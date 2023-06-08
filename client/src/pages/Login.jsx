import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

//아래는 로그인 컴포넌트입니다.
function Login() {

    const login = () => {
        axios.post('/api/login/', {
            //키 값 보내기
            email: email,
            password: pw,

        })
        .then((response) => {
            console.log("성공입니다.", response.data);
            alert('로그인 성공!')
            
        })
        .catch((error) => {
            console.log("에러가 발생했습니다", error.response);
            alert('로그인 실패!')
        })
    }
 
    const completeLogin = () => {
        console.log("들어옴")
        login()

      }

    const [email, setEmail] = useState(''); //첫번째 state 생성 for email
    const [pw, setPw] = useState(''); //두번째 state 생성 for password

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);

    const [notAllow, setNotAllow] = useState(true);

    const navigate = useNavigate()

    //특정한 형식으로 값이 입력되었는지 체크
    //여기서는 값이 비었는지만 확인
    const handleEmail = (e) => {
        setEmail(e.target.value);
        //const regex = /^~~
        if (email.length === 0) {
            setEmailValid(false)
        }
        else {
            setEmailValid(true)
        }
    }

    const handlePw = (e) => {
        setPw(e.target.value);
        //const regex = /^~~
        if (pw.length === 0) {
            setPwValid(false)
        }
        else {
            setPwValid(true)
        }
    }

    useEffect(() => {
        //useEffect 훅을 활용하여 pw와 email state 값 valid여부 체크 (state값 변경 시마다)
        //[emailValid, pwValid]값이 변할 때 마다 useEffect작동
        if (emailValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, pwValid])

    return (
    <div className = "pages">
        <div className = "titleWrap">
         로그인 정보를 입력해 주세요 <br></br> 방문해 주셔서 감사합니다😀
        </div>

        <div className = "contentWrap">
            <div className = "inputTitle">ID</div>
            <div className = "inputWrap"> 
                <input type = 'text' className = "input" placeholder = "example@gmail.com" value = {email} onChange= {handleEmail}/>
            </div>
            
            <div style = {{marginTop: "26px"}} className = "inputTitle">Password</div>
            <div className = "inputWrap"> 
                <input type = 'password' className = "input" placeholder = "********" value = {pw} onChange= {handlePw}/>
            </div>

            <div>
                <button style = {{marginTop: "26px"}} disabled = {notAllow} className = "bottomButton" onClick = {completeLogin}>
                    로그인
                </button>

            </div>
            <div>
                <button className = "bottomButton" onClick = {() => {navigate('/register')}}>
                    회원가입
                </button>
            </div>
        </div>
    </div>
    )
}

export default Login;

//디자인 완성 후
//실제로 로그인 화면으로서의 기능 javascript로 구현
//input에 대해서... value로 state 값을 넣어주고
//onchange interface에는 이벤트 발생할 때 마다 setstate function으로 해당 value에 연결된 state값을 업데이트한다.
