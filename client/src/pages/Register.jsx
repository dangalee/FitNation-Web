import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'



function Register(){

    const register = () => {
        axios.post('/api/register/', {
            //키 값 보내기
            role: role,
            name: name,
            username: userName,
            email: email,
            password: confirmedPw,

        })
        .then((response) => {
            console.log("성공입니다.", response.data);
            alert('회원가입이 완료되었습니다.')
            
        })
        .catch((error) => {
            console.log("에러가 발생했습니다", error.response);
            alert('회원가입 실패: 중복된 이메일입니다.')
        })

    }

    const completeRes = () => {
        register()
        
        navigate('/')
        
      }
    
    const navigate = useNavigate()
    const[role, setRole] = useState('고객')
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[userName, setUserName] = useState('')
    const[pw, setPw] = useState('')
    const[confirmedPw, setConfirmedPw] = useState('')

    const [emailValid, setEmailValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [userNameValid, setUserNameValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleEmail = (e) => {
        setEmail(e.target.value);

        if (email.length === 0) {
            setEmailValid(false)
        }
        else {
            setEmailValid(true)
        }
        console.log(emailValid)
    }

    const handleName = (e) => {
        setName(e.target.value);

        if (name.length === 0) {
            setNameValid(false)
        }
        else {
            setNameValid(true)
        }
    }
    const handleUserName = (e) => {
        setUserName(e.target.value);

        if (userName.length === 0) {
            setUserNameValid(false)
        }
        else {
            setUserNameValid(true)
        }
    }



    //confirmedPWValid를 useEffect 적용시 회원가입 버튼 활성화가 안되는 에러가 발생
    //한번 더 입력해야 아래 handleconfirmedpw가 발생, handlepw도 마찬가지라 일단 직접 useEffect구문 안에서 해결하는 방식으로 함
    // const handleConfirmedPw = (e) => {
    //     setConfirmedPw(e.target.value);

    //     if (confirmedPw !== pw) {
    //         setConfirmedPwValid(false)
    //     }
    //     else {
    //         setConfirmedPwValid(true)
    //     }
    // }

    useEffect(() => {
        //useEffect 훅을 활용하여 pw와 email state 값 valid여부 체크 (state값 변경 시마다)
        //[emailValid, pwValid]값이 변할 때 마다 useEffect작동
        if (emailValid && nameValid && userNameValid && pw.length > 7 && confirmedPw === pw) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, pw, confirmedPw, nameValid, userNameValid])

    return(
    <div className = "pages">
        <div className = "titleWrap">
        회원가입 정보를 아래 입력해주세요.
        </div>
        <div className = "contentWrap">
        <select id = "role" value = {role} onChange = {(e) => setRole(e.target.value)}>
            <option value = "client"> 고객</option>
            <option value = "trainer"> 트레이너</option>
            <option value = "admin"> 관리자</option>
        </select>
        <div className = "inputTitle"> 성함을 입력해주세요. </div>
        <div className = "inputWrap">
       
            <input type="text" id = "name" className = "input"
            name = 'name' 
            value = {name} 
            placeholder = 'ex. 홍길동'
            onChange={handleName}/>
        </div>
        <div className = "inputTitle"> 아이디로 사용될 이메일주소를 입력해주세요. </div>
        <div className = "inputWrap">
            <input type="text" id = "email" className = "input"
            name = 'email' 
            value = {email} 
            placeholder = 'example@naver.com'
            onChange={handleEmail}/>
        </div>
        <div className = "inputTitle"> 사이트 내에서 이용하실 별명을 입력해주세요. </div>
        <div className = "inputWrap">
            <input type="text" id = "userName" className = "input"
            name = 'userName' 
            value = {userName} 
            placeholder = 'ex. 뽀로로'
            onChange = {handleUserName}/>
        </div>
        <div className = "inputTitle"> 비밀번호를 입력해주세요.</div>
        <div className = "inputWrap">
            <input type = 'password' id = "pw" className = "input"
            name = 'pw' 
            value = {pw} 
            placeholder = '********'
            onChange={(e) => setPw(e.target.value)}/>
        </div>
        <div className = "errorMsgWrap"> {pw.length < 8 && (<div>비밀번호는 8자리 이상입니다. </div>)}
        </div>
        <div className = "inputTitle"> 비밀번호를 재입력해주세요.</div>
        <div className = "inputWrap">
            <input type = 'password' id = "confirmPw" className = "input"
            name = 'confirmPw' 
            value = {confirmedPw} 
            placeholder = '********'
            onChange = {(e) => setConfirmedPw(e.target.value)}/>
        </div>
        <div className = "errorMsgWrap"> {confirmedPw !== pw && (<div>비밀번호가 일치하지 않습니다.</div>)}
        </div>
        <div>
            <button className = "bottomButton"  disabled = {notAllow} onClick = {completeRes}>
                    완료
            </button>
        </div>

        </div>
    </div>
    )
}
export default Register;