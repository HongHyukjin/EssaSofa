import React from 'react';
import $ from 'jquery';
import { Link, Route, Routes } from 'react-router-dom';
import NomemberComponent from './NomemberComponent';
import FooterComponent from '../FooterComponent';
import HeaderComponent from '../HeaderComponent';

function SigninComponent(props) {

    const [state,setState] = React.useState({
        아이디 : '',
        비밀번호 : '',
    })

    const onChangeId = (e)=>{
        const {value} = e.target;

        setState({
            ...state,
            아이디 : value
        })
    }

    const onChangePw=(e)=>{
        const {value} = e.target;

        setState({
            ...state,
            비밀번호 : value
        })
    }

    const onSubmitSignin=(e)=>{
        e.preventDefault();
        const formData = {
            "user_id" : state.아이디,
            "user_pw" : state.비밀번호
        }

        $.ajax({
            url : 'http://localhost:8080/JSP/essa/signin_action.jsp',
            type : 'POST',
            data : formData,
            dataType : 'json',

            success(res){
                console.log('ajax 성공');
                console.log(res.result);
                console.log(state.아이디);
                console.log(state.비밀번호);
                if(res.result=== '1'){
                    sessionStorage.setItem('user_id', state.아이디);

                    window.location.href='/';
                }
                else if(res.result==='0'){
                    alert('비밀번호를 확인하세요')
                }
                else {
                    alert('아이디를 확인하세요')
                }
            },
            error(err){
                console.log('ajax 실패' + err);
            }
        })
    }

    React.useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    
    return (
        <>
        <HeaderComponent/>

        <div id='signin'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <div className="title-box">
                            <h1>로그인</h1>
                        </div>
                    </div>
                    <div className="content">
                        <div className="member-tab">
                            <ul>
                                <li><label htmlFor="tab1" role='button'>회원 로그인</label></li>
                                <li><label htmlFor="tab2" role='button'><Link to='/로그인/비회원페이지'>비회원 주문조회</Link></label></li>
                            </ul>
                        </div>
                        <form id="formLogin"  onSubmit={onSubmitSignin} >
                            <div className="member-login-box">
                                <div className="login-input-box">
                                    <input 
                                    type="text" 
                                    name='userId' 
                                    id='userId'
                                     placeholder='아이디' 
                                     onChange={onChangeId}/>
                                    <input 
                                    type="password" 
                                    name='userPw' 
                                    id='userPw' 
                                    placeholder='비밀번호' 
                                    onChange={onChangePw}/>
                                </div>  
                            </div>
                            <div className="login-chek-box">    
                                <div className="id-chek">
                                    <span className='form-id'>
                                        <img src="../img/check1.png" alt="" />
                                        <label htmlFor="saveId" className='check-on'>아이디 저장</label>
                                    </span>
                                </div>
                            </div>
                            <div className="login-btn-box">
                                <button type="submit" className='member-login-btn'>로그인</button>
                            </div>
                            <div className="find-btn-box">
                                <ul>
                                    <li><Link to='/아이디찾기'><label htmlFor="" role='button'>아이디찾기</label></Link></li>
                                    <li><i> | </i></li>
                                    <li><Link to='/비밀번호찾기'><label htmlFor="" role='button'>비밀번호 찾기</label></Link></li>
                                </ul>
                            </div>
                        </form>
                        <div className="member-sns-login">
                            <a href="!#">
                                <img src="../img/pc_naver.png" alt="" />
                                <p>네이버<br />로그인</p>
                            </a>
                            <a className='kakao' href="!#">
                                <img className='Kakao' src="../img/pc_kakao.png" alt="" />
                                <p>카카오<br />로그인</p>
                            </a>
                            <a href="!#">
                                <img src="../img/pc_apple.png" alt="" />
                                <p>Apple<br />로그인</p>
                            </a>
                        </div>
                        <div className="signup-btn-box">
                            <span>회원가입 + 카카오 친구 추가시 <strong>최대 4만원 혜택!</strong></span>
                            <button className='signup-btn'>회원가입</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterComponent/>
        </>
    );
}

export default SigninComponent;