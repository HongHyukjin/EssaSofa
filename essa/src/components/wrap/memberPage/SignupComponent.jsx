import React from 'react';
import $ from 'jquery';
import PostCode from 'react-daum-postcode';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';

export default function SignupComponent(props) {

    const [state, setState] = React.useState({
        user_id: "",
        isIdMsg: '',
        isIdErr: false,
        user_pw: "",
        isPwMsg: '',
        isPwErr: false,
        user_pw_ok: "",
        isPwOkMsg: '',
        isPwOkErr: false,
        user_name: "",
        isNameMsg:'',
        user_email: "",
        isEmailMsg: '',
        isEmailErr:false,
        user_hp: "",
        isHpMsg:'',
        isHpErr:false,
        user_ph: "",
        user_addr1: "",
        user_addr2: "",
        user_addr3: "",
        isPost: false,
        user_birth_year: "1998",
        user_birth_month: "01",
        user_birth_date: "01",
        user_agr1: "메일 수신 : 비동의",
        user_agr2: "SMS 수신 : 비동의",
        isClick1: false,
        isClick2: false
    });

    React.useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const onClickAgr1 = (e) => {
        if (state.isClick1 === false) {
            $('#signup .agr1').addClass(' on');
            setState({
                ...state,
                isClick1: true,
                user_agr1: "메일 수신 : 동의"
            })
        }
        if (state.isClick1 === true) {
            $('#signup .agr1').removeClass(' on');
            setState({
                ...state,
                isClick1: false,
                user_agr1: "메일 수신 : 비동의"
            })
        }
    }
    const onClickAgr2 = (e) => {
        if (state.isClick2 === false) {
            $('#signup .agr2').addClass(' on');
            setState({
                ...state,
                isClick2: true,
                user_agr2: "SMS 수신 : 동의"
            })
        }
        if (state.isClick2 === true) {
            $('#signup .agr2').removeClass(' on');
            setState({
                ...state,
                isClick2: false,
                user_agr2: "SMS 수신 : 비동의"
            })
        }
    }

    const onChangeuserId = (e) => {

        const { value } = e.target;
        const regExp1 = /([가-힣ㄱ-ㅎㅏ-ㅣ])|(\s)|([~`!#$%^&*()=+\\|[\]{};:'",<>/?])/g;
        const regExp2 = /.{4,}/g;
        let user_id = '';
        let isIdErr = false;
        let isIdMsg = '';

        user_id = value.replace(regExp1, '');


        if (regExp2.test(value) === false) {
            isIdErr = true;
            isIdMsg = '최소 4 이상 입력해 주세요.';
            $('.errId').css({ "color": "#222" });
        }
        else {
            isIdErr = false;
            isIdMsg = '사용 가능한 아이디입니다.';
            $('.errId').css({ "color": "#6184b1" });

        }

        setState({
            ...state,
            user_id: user_id,
            isIdErr: isIdErr,
            isIdMsg: isIdMsg
        })
    }


    const onChangeUserPw = (e) => {

        const { value } = e.target;
        let user_pw = ''
        let isPwErr = false;
        let isPwMsg = '';

        const regExp2 = /.{10,16}/g;
        const regExp1 = /.{0,16}/g;
        const regExp3 = /[%{}[\]\\"':;?/>.<,]/g;
        const regExp4 = /([가-힣ㄱ-ㅎㅏ-ㅣ])|(\s)/g;
        const regExp5 = /([0-9]+[A-Za-z]+)+|([A-Za-z]+[0-9]+)+|([!@#$%^&*()_+\-=`~]+[A-Za-z]+)+|([A-Za-z]+[!@#$%^&*()_+\-=`~]+)+|([0-9]+[!@#$%^&*()_+\-=`~]+)+|([!@#$%^&*()_+\-=`~]+[0-9]+)/g;

        user_pw = value.replace(regExp4, '');



        if (regExp1.test(value) === false) {
            isPwErr = true;
            isPwMsg = '최대 16자 이하 입력해주세요';
            $('.errPw').css({ "color": "#222" });
        }
        else if (regExp2.test(value) === false) {
            isPwErr = true;
            isPwMsg = '최소 10자 이상 입력해주세요';
            $('.errPw').css({ "color": "#222" });
        }
        else if (regExp3.test(value) === true) {
            isPwErr = true;
            isPwMsg = '사용불가한 문자가 포함되어 있습니다. (사용가능 특수문자 : !@#$%^&*()_+-=`~)';
            $('.errPw').css({ "color": "#222" });
        }
        else if (regExp5.test(value) === false) {
            isPwErr = true;
            isPwMsg = '사용불가! 영문대/소문자, 숫자, 특수문자 중 2가지 이상 조합하세요.';
            $('.errPw').css({ "color": "#222" });
        }
        else {
            isPwErr = false;
            isPwMsg = '사용가능한 비밀번호입니다';
            $('.errPw').css({ "color": "#6184b1" });
        }

        setState({
            ...state,
            user_pw: user_pw,
            isPwErr: isPwErr,
            isPwMsg: isPwMsg
        })
    }
    const onChangeUserPwOk = (e) => {

        const { value } = e.target;
        let isPwOkErr = false;
        let isPwOkMsg = '';

        if (value !== state.user_pw) {
            isPwOkErr = true;
            isPwOkMsg = '동일한 비밀번호를 입력';
        }
        else if (value === state.user_pw) {
            isPwOkErr = false;
        }

        setState({
            ...state,
            user_pw_ok: value,
            isPwOkErr: isPwOkErr,
            isPwOkMsg: isPwOkMsg
        })
    }
    const onChangeUserName = (e) => {

        const { value } = e.target;
        const regExp = /[^가-힣ㄱ-ㅎㅏ-ㅣA-Za-z]/g;
        let user_name = "";

        user_name = value.replace(regExp, "");
        setState({
            ...state,
            user_name: user_name
        })
    }
    const onChangeUserEmail = (e) => {
        const {value}=e.target;
        let isEmailErr=false;
        let isEmailMsg='';
        const regExp=/^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\-_`~!#$%^&*+='?.]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\-_]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ.\-_]+\.[a-z]{2,5}$/gi;
        if(regExp.test(value)===false){
            isEmailErr=true;
            isEmailMsg='이메일을 정확하게 입력해주세요.';
            $('.errEmail').css({ "color": "#222" });
        }
        else{
            isEmailErr=false;
            isEmailMsg='사용가능한 이메일입니다.';
            $('.errEmail').css({ "color": "#6184b1" });
        }
        setState({
            ...state,
            user_email: value,
            isEmailErr:isEmailErr,
            isEmailMsg:isEmailMsg
        })
    }

    const onChangeUserHp = (e) => {

        const { value } = e.target
        let user_hp = '';
        let isHpMsg='';
        let isHpErr=false;

        const regExp1 = /[^\d]/g;
        const regExp2= /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
        user_hp = value.replace(regExp1, '');
        if(state.user_hp.length<10||regExp2.test(value)===false){
            isHpMsg= '전화전호를 정확하게 입력해주세요.';
            isHpErr=true;
        }
        else{
            isHpMsg= '';
            isHpErr=false;
        }

        setState({
            ...state,
            user_hp: user_hp,
            isHpMsg:isHpMsg,
            isHpErr:isHpErr
        })
    }
    const onChangeUserPh = (e) => {

        const { value } = e.target
        let user_ph = '';

        const regExp = /[^\d]/g;
        user_ph = value.replace(regExp, '');

        setState({
            ...state,
            user_ph: user_ph
        })
    }

    const onChangeUserAddr1 = (e) => {
        setState({
            ...state,
            user_addr1: e.target.value
        })
    }
    const onChangeUserAddr2 = (e) => {
        setState({
            ...state,
            user_addr2: e.target.value
        })
    }
    const onChangeUserAddr3 = (e) => {
        setState({
            ...state,
            user_addr3: e.target.value
        })
    }
    const onChangeUserBirthYear = (e) => {
        setState({
            ...state,
            user_birth_year: e.target.value
        })
    }
    const onChangeUserBirthMonth = (e) => {
        setState({
            ...state,
            user_birth_month: e.target.value
        })
    }
    const onChangeUserBirthDate = (e) => {
        setState({
            ...state,
            user_birth_date: e.target.value
        })
    }

    const onSubmitSignUp = (e) => {
        e.preventDefault();

        if(state.user_id===''){
            $('.errId').css({ "color": "#222" });
            $('#userId').focus();
            setState({
                ...state,
                isIdMsg: '필수항목입니다'
            })
        }
        else if(state.isIdErr===true){
            $('#userId').focus();
        }
        else if(state.user_pw===''){
            $('.errPw').css({ "color": "#222" });
            $('#userPw').focus();
            setState({
                ...state,
                isPwMsg: '필수항목입니다'
            })
        }
        else if(state.isPwErr===true){
            $('#userPw').focus();
        }
        else if(state.user_pw===''){
            $('.errPw').css({ "color": "#222" });
            $('#userPw').focus();
            setState({
                ...state,
                isPwMsg: '필수항목입니다'
            })
        }
        else if(state.isPwErr===true){
            $('#userPw').focus();
        }
        else if(state.user_pw_ok===''){
            $('.errPwOk').css({ "color": "#222" });
            $('#userPwOk').focus();
            setState({
                ...state,
                isPwOkMsg: '필수항목입니다'
            })
        }
        else if(state.isPwOkErr===true){
            $('#userPwOk').focus();
        }
        else if(state.user_name===''){
            $('#userName').focus();
            setState({
                ...state,
                isNameMsg: '필수항목입니다'
            })
        }
        else if(state.user_email===''){
            $('#userEmail').focus();
            $('.errEmail').css({ "color": "#222" });
            setState({
                ...state,
                isEmailMsg: '필수항목입니다'
            })
        }
        else if(state.isEmailErr===true){
            $('#userEmail').focus();
        }
        else if(state.user_hp===''){
            $('#userHp').focus();
            setState({
                ...state,
                isHpMsg: '필수항목입니다'
            })
        }
        else if(state.isHpErr===true){
            $('#userHp').focus();
        }
        else{
            const formData = {
                "user_id": state.user_id,
                "user_pw": state.user_pw,
                "user_name": state.user_name,
                "user_email": state.user_email,
                "user_hp": state.user_hp,
                "user_ph": state.user_ph,
                "user_addr1": state.user_addr1,
                "user_addr2": state.user_addr2,
                "user_addr3": state.user_addr3,
                "user_birth_year": state.user_birth_year,
                "user_birth_month": state.user_birth_month,
                "user_birth_date": state.user_birth_date,
                "user_agr1": state.user_agr1,
                "user_agr2": state.user_agr2
            }
    
            $.ajax({
                url: 'http://localhost:8080/JSP/essa/signup_action.jsp',
                type: 'POST',
                data: formData,
                success(res) {
                    console.log('AJAX 성공!');
                    console.log(res);
                    if(res.result=== '1'){
                        alert('회원가입 되었습니다.');
                        window.location.href="#/로그인";
                    }
                    else if(res.result=== '-2'){
                        alert('중복된 아이디입니다.다른 아이디를 사용해주세요.');
                    }
                    else{
                        alert('데이터베이스 오류 다시 시도해주세요');
                    }
                },
                error(err) {
                    console.log('AJAX 실패!' + err);
                }
            });
        }


    }

    const onCompletePost = (data) => {
        if (data.address !== null) {
            setState({
                ...state,
                user_addr2: data.address,
                user_addr1: data.zonecode,
                isPost: false
            })
        }
    }


    const onClickOpen = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isPost: true
        })
    }
    const onClickClose = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isPost: false
        })
    }


    return (
        <>
            <HeaderComponent />
            <div id='signup'>
                <div className="container">
                    <div className="gap">
                        <div className="link-box">
                            <ul>
                                <li><a href="!#">HOME</a></li>
                                <li>회원가입</li>
                                <li>정보입력</li>
                            </ul>
                        </div>
                        <div className="title">
                            <h1>정보입력</h1>
                        </div>
                        <div className="content">
                            <form id='signupForm' action="" method='post' name='sign_up' onSubmit={onSubmitSignUp}>
                                <div className="sub-title">
                                    <h3>기본정보</h3>
                                    <p>표시는 반드시 입력하셔야 하는 항목입니다.</p>
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className='important'><span>아이디</span></th>
                                            <td>
                                                <input type="text" name='user_id' id='userId' maxLength={50} onChange={onChangeuserId} value={state.user_id} />
                                                <p className={`err errId ${state.isIdMsg !== '' ? ' on' : ''}`}>{state.isIdMsg}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='important'><span>비밀번호</span></th>
                                            <td>
                                                <input type="password" name='user_pw' maxLength={16} id='userPw' onChange={onChangeUserPw} value={state.user_pw} />
                                                <p className={`err errPw ${state.isPwMsg !== '' ? ' on' : ''}`}>{state.isPwMsg}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='important'><span>비밀번호 확인</span></th>
                                            <td>
                                                <input type="password" name='user_pw_ok' id='userPwOk' onChange={onChangeUserPwOk} />
                                                <p className={`err ${state.isPwOkMsg!=='' ? ' on' : ''}`}>{state.isPwOkMsg}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='important'><span>이름</span></th>
                                            <td>
                                                <input type="text" name='user_name' id='userName' onChange={onChangeUserName} value={state.user_name} />
                                                <p className={`err ${state.isNameMsg!=='' ? ' on' : ''}`}>{state.isNameMsg}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='important'><span>이메일</span></th>
                                            <td >
                                                <input type="text" name='user_email' id='userEmail' onChange={onChangeUserEmail} value={state.user_email} />
                                                <p className={`err errEmail ${state.isEmailMsg !== '' ? ' on' : ''}`}>{state.isEmailMsg}</p>
                                                <label className='agr1' htmlFor="" onClick={onClickAgr1}>정보/이벤트 메일 수신에 동의합니다.</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className='important'><span>휴대폰번호</span></th>
                                            <td>
                                                <input type="text" placeholder=' - 없이 입력하세요.' maxLength={11} name='user_hp' id='userHp' onChange={onChangeUserHp} value={state.user_hp} />
                                                <p className={`err ${state.isHpMsg!=='' ? ' on' : ''}`}>{state.isHpMsg}</p>
                                                <label className='agr2' htmlFor="" onClick={onClickAgr2}>정보/이벤트 SMS 수신에 동의합니다.</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><span>전화번호</span></th>
                                            <td>
                                                <input type="text" placeholder=' - 없이 입력하세요.' maxLength={11} name='user_ph' id='userPh' onChange={onChangeUserPh} value={state.user_ph} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><span>주소</span></th>
                                            <td className='addr'>
                                                <input type="text" name='user_addr1' id='userAddr1' onChange={onChangeUserAddr1} disabled={true} value={state.user_addr1} /><button onClick={onClickOpen}>우편번호검색</button>
                                                <input type="text" name='user_addr2' id='userAddr2' onChange={onChangeUserAddr2} disabled={true} value={state.user_addr2} />
                                                <input type="text" name='user_addr3' id='userAddr3' onChange={onChangeUserAddr3} value={state.user_addr3} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="sub-title">
                                    <h3>부가 정보</h3>
                                </div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th className='important'><span>생일</span></th>
                                            <td className='birth'>
                                                <select name="user_birth_year" id="userBirthYear" onChange={onChangeUserBirthYear}>
                                                    <option value="1943">1943</option>
                                                    <option value="1944">1944</option>
                                                    <option value="1945">1945</option>
                                                    <option value="1946">1946</option>
                                                    <option value="1947">1947</option>
                                                    <option value="1948">1948</option>
                                                    <option value="1949">1949</option>
                                                    <option value="1950">1950</option>
                                                    <option value="1951">1951</option>
                                                    <option value="1952">1952</option>
                                                    <option value="1953">1953</option>
                                                    <option value="1954">1954</option>
                                                    <option value="1955">1955</option>
                                                    <option value="1956">1956</option>
                                                    <option value="1957">1957</option>
                                                    <option value="1958">1958</option>
                                                    <option value="1959">1959</option>
                                                    <option value="1960">1960</option>
                                                    <option value="1961">1961</option>
                                                    <option value="1962">1962</option>
                                                    <option value="1963">1963</option>
                                                    <option value="1964">1964</option>
                                                    <option value="1965">1965</option>
                                                    <option value="1966">1966</option>
                                                    <option value="1967">1967</option>
                                                    <option value="1968">1968</option>
                                                    <option value="1969">1969</option>
                                                    <option value="1970">1970</option>
                                                    <option value="1971">1971</option>
                                                    <option value="1972">1972</option>
                                                    <option value="1973">1973</option>
                                                    <option value="1974">1974</option>
                                                    <option value="1975">1975</option>
                                                    <option value="1976">1976</option>
                                                    <option value="1977">1977</option>
                                                    <option value="1978">1978</option>
                                                    <option value="1979">1979</option>
                                                    <option value="1980">1980</option>
                                                    <option value="1981">1981</option>
                                                    <option value="1982">1982</option>
                                                    <option value="1983">1983</option>
                                                    <option value="1984">1984</option>
                                                    <option value="1985">1985</option>
                                                    <option value="1986">1986</option>
                                                    <option value="1987">1987</option>
                                                    <option value="1988">1988</option>
                                                    <option value="1989">1989</option>
                                                    <option value="1990">1990</option>
                                                    <option value="1991">1991</option>
                                                    <option value="1992">1992</option>
                                                    <option value="1993">1993</option>
                                                    <option value="1994">1994</option>
                                                    <option value="1995">1995</option>
                                                    <option value="1996">1996</option>
                                                    <option value="1997">1997</option>
                                                    <option value="1998" selected>1998</option>
                                                    <option value="1999">1999</option>
                                                    <option value="2000">2000</option>
                                                    <option value="2001">2001</option>
                                                    <option value="2002">2002</option>
                                                    <option value="2003">2003</option>
                                                </select>
                                                <select name="user_birth_month" id="userBirthMonth" onChange={onChangeUserBirthMonth}>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                                <select name="user_birth_date" id="userBirthDate" onChange={onChangeUserBirthDate}>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                    <option value="29">29</option>
                                                    <option value="30">30</option>
                                                    <option value="31">31</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="btn-box">
                                    <button>취소</button>
                                    <button type='submit'>회원가입</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {
                state.isPost && (
                    <div id='postCode'>
                        <div className="container">
                            <div className="contents">
                                <div className="exit">
                                    <h3>우편번호 찾기</h3>
                                    <button onClick={onClickClose}><img src="./img/product/icon_x.png" alt="" /></button>
                                </div>
                                <PostCode id="post"
                                    autoClose
                                    onComplete={onCompletePost}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            <FooterComponent />
        </>
    );

}
