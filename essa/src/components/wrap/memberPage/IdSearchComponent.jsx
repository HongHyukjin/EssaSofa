import React from 'react';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';

function IdSearchComponent(props) {

    const [state, setState] = React.useState({
        userName1: '',
        userEmail: '',
        userName2: '',
        userHp: '',
        isBtn3 : true,
        아이디 : ''
    })
    const [isTab, setIsTab] = React.useState(true);
    const [isBtn, setIsBtn] = React.useState(false);
    const [isBtn2, setIsBtn2] = React.useState(false);

    

    // const [userName, setUserName] = React.useState('');
    // const [userHp, setUserHp] = React.useState('');

    // const [userName2, setUserName2] = React.useState('');
    // const [userEmail, setUserEmail] = React.useState('');

    const onChangeName1 = (e) => {
        setState({
            ...state,
            userName1: e.target.value
        })
    }

    const onChangeEmail = (e) => {
        setState({
            ...state,
            userEmail: e.target.value
        })
    }
    const onChangeHp = (e) => {
        setState({
            ...state,
            userHp: e.target.value
        })
    }

    const onChangeName2 = (e) => {
        setState({
            ...state,
            userName2: e.target.value
        })
    }

    const onClickTabBtn = (e, value) => {

        if (value === "휴대폰") {
            setIsTab(true);
        }
        else {
            setIsTab(false);
        }
    }
    React.useEffect(() => {
        (state.userName1 !== '' && state.userHp !== '') ? setIsBtn(true) : setIsBtn(false);
        (state.userName2 !== '' && state.userEmail !== '') ? setIsBtn2(true) : setIsBtn2(false);

    }, [state]);

    const onSubmitIdSearch = (e) => {
        
        e.preventDefault();
        const formData = {
            "user_name": state.userName1,
            "user_email": state.userEmail
        }

        // axios({
        //     url : 'http://localhost:8080/JSP/essa/idSearch_action.jsp',
        //     method : 'POST',
        //     data : {},
        //     params : {
        //         "userName1" : state.userName1,
        //         "userEmail" : state.userEmail
        //     }
        // })
        // .then((res)=>{
        //     console.log("성공" + res );
        // })
        // .catch((err)=>{
        //     console.log("실패" + err);
        // })

        $.ajax({
            url: 'http://localhost:8080/JSP/essa/idSearch_action.jsp',
            type: 'post',
            data: formData,
            dataType: 'json',
            success(res) {
                console.log('Ajax 성공')
                console.log(res);
                console.log(res.result);
                // window.location.href = '#/아이디표시';
                if(res.result===''){
                    alert('없는 정보');
                }
                else {
                    setState({
                        ...state,
                        isBtn3:false,
                        아이디:res.result
                    })    
                }
                
            },
            error(err) {
                console.log('Ajax 실패')
                console.log(err);
            }
        })
    }

    const onSubmitIdSearch2=(e)=>{
        e.preventDefault();
        const formData2 = {
            "user_name" : state.userName2,
            "user_hp" : state.userHp
        }

        $.ajax({
            url : 'http://localhost:8080/JSP/essa/idSearch2_action.jsp',
            type : 'post',
            data : formData2,
            dataType: 'json',
            success(res){
                console.log('ajax 성공');
                console.log(res);
                if(res.result===''){
                    alert('없는 정보');
                }
                else {
                    setState({
                        ...state,
                        isBtn3: false,
                        아이디 :res.result
                    })
                }
            },
            error(err){
                console.log('ajax 실패');
                console.log(err);
            }
        })
    }


    return (
        <>
            <HeaderComponent />
            <div id='idsearch'>
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h1>아이디 찾기</h1>
                        </div>
                        <div className="content">
                            <form action="formFindId" method='post' /* onSubmit={onSubmitIdSearch} */ >
                                {
                                    state.isBtn3 === true ? (
                                        <div className="find-id-box">
                                            <div className="choose-btn">
                                                <input type="radio" id='radiotab1' name='radiotab' onClick={(e) => onClickTabBtn(e, "휴대폰")} className={isTab ? 'on' : ''} defaultChecked /><label htmlFor="radiotab1" >이메일</label>
                                                <input type="radio" id='radiotab2' name='radiotab' onClick={(e) => onClickTabBtn(e, "이메일")} className={isTab ? '' : 'on'} /><label htmlFor="radiotab2">휴대폰번호</label>
                                            </div>
                                            {
                                                isTab ?
                                                    (
                                                        <>
                                                            <div className="idsearch-main-box">
                                                                <div className="idsearch-box">
                                                                    <ul>
                                                                        <li><input onChange={onChangeName1} type="text" className='input-name' name='user_name' id='user_name' value={state.userName1} placeholder='이름' /></li>
                                                                        <li><input onChange={onChangeEmail} type="text" className='input-email' name='user_email' id='user_email' value={state.userEmail} placeholder='가입메일주소' /></li>
                                                                    </ul>
                                                                </div>
                                                                <button className='idsearch-btn' onClick={onSubmitIdSearch}>아이디 찾기</button>
                                                            </div>
                                                        </>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <div className="idsearch-main-box">
                                                                <div className="idsearch-box">
                                                                    <ul>
                                                                        <li><input type="text" onChange={onChangeName2} className='input-name' name='userName2' id='userName2' value={state.userName2} placeholder='이름' /></li>
                                                                        <li><input type="text" onChange={onChangeHp} className='input-email' name='userHp' id='userHp' value={state.userHp} placeholder='가입휴대폰번호' /></li>
                                                                    </ul>
                                                                </div>
                                                                <button className='idsearch-btn' onClick={onSubmitIdSearch2}>아이디 찾기</button>
                                                            </div>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    ) : (
                                        <ul className='btn4'>
                                            <li>{state.userName1}회원님의 아이디는</li>
                                            <li><span>{state.아이디}</span>입니다</li>
                                        </ul>
                                    )
                                }


                                <div className="btn-member-sec">
                                    <ul>
                                        <li><Link to='/비밀번호찾기'><button className='pwsearch-btn'>비밀번호 찾기</button></Link></li>
                                        <li><Link to='/로그인'><button className='login-btn'>로그인하기</button></Link></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}

export default IdSearchComponent;