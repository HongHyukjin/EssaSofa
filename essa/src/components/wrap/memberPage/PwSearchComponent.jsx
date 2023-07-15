import React from 'react';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import $ from 'jquery';
import axios from 'axios';

function PwSearchComponent(props) {

    const [state, setState] = React.useState({
        userId: '',
        userName: '',
        isBtn3: true,
        비밀번호: ''
    })
    const [isTab, setIsTab] = React.useState(true);
    const [isBtn, setIsBtn] = React.useState(false);
    const [isBtn2, setIsBtn2] = React.useState(false);



    // const [userName, setUserName] = React.useState('');
    // const [userHp, setUserHp] = React.useState('');

    // const [userName2, setUserName2] = React.useState('');
    // const [userEmail, setUserEmail] = React.useState('');

    const onChangeId = (e) => {
        setState({
            ...state,
            userId: e.target.value
        })
    }

    const onChangeName = (e) => {
        setState({
            ...state,
            userName: e.target.value
        })
    }



    const onSubmitIdSearch = (e) => {

        e.preventDefault();
        const formData = {
            "user_id": state.userId,
            "user_name": state.userName
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
            url: 'http://localhost:8080/JSP/essa/pwSearch_action.jsp',
            type: 'post',
            data: formData,
            dataType: 'json',
            success(res) {
                console.log('Ajax 성공')
                console.log(res);
                console.log(res.result);
                // window.location.href = '#/아이디표시';
                if (res.result === '') {
                    alert('없는 정보');
                }
                else {
                    setState({
                        ...state,
                        isBtn3: false,
                        비밀번호: res.result
                    })
                }

            },
            error(err) {
                console.log('Ajax 실패')
                console.log(err);
            }
        })
    }



    return (
        <>
            <HeaderComponent />
            <div id='pwsearch'>
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h1>비밀번호 찾기</h1>
                        </div>
                        <div className="content">
                            <form action="formFindId" method='post' onSubmit={onSubmitIdSearch} >
                                {
                                    state.isBtn3 === true ? (
                                        <>                                    <div className="find-id-box">
                                            <div className="choose-btn">
                                                <ul className='title-2'>
                                                    <li>아이디 입력</li>
                                                    <li><p>비밀번호를 찾고자 하는 아이디를 입력해주세요</p></li>
                                                </ul>
                                            </div>
                                            <div className="idsearch-main-box">
                                                <div className="idsearch-box">
                                                    <ul>
                                                        <li><input type="text" onChange={onChangeId} className='input-name' name='userId' id='userId' value={state.userId} placeholder='아이디' /></li>
                                                        <li><input type="text" onChange={onChangeName} className='input-email' name='userName' id='userName' value={state.userName} placeholder='이름' /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                            <div className="btn-member-sec">
                                                <ul>
                                                    <li><button className='login-btn'>다음</button></li>
                                                </ul>
                                            </div>
                                        </>

                                    ) :
                                        (
                                            <ul className='btn4'>
                                                <li>{state.userName}회원님의 비밀번호는</li>
                                                <li><span>{state.비밀번호}</span>입니다</li>
                                            </ul>
                                        )
                                }





                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}

export default PwSearchComponent;