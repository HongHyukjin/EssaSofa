import React, { useRef } from 'react';
import $ from 'jquery';
import FooterComponent from '../FooterComponent';
import HeaderComponent from '../HeaderComponent';
import axios from "axios";
import { Link } from 'react-router-dom';


function UpdateComponent(props) {

    const [state, setState] = React.useState({
        아이디: '',
        비밀번호: '',
        이름: '',
        이메일: '',
        핸드폰번호: 0,
        생년: 0,
        생월: 0,
        생일: 0,
        전화번호: 0,

        isIdError: false,
        isIdMsg: ''
    })

    const onChangeId = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            아이디: value
        })
    }

    const onChangePw = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            비밀번호: value
        })
    }

    const onChangeName = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            이름: value
        })
    }

    const onChangeEmail = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            이메일: value
        })
    }

    const onChangePh = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            핸드폰번호: value
        })
    }

    const onChangeYear = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            생년: value
        })
    }

    const onChangeMonth = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            생월: value
        })
    }

    const onChangeDate = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            생일: value
        })
    }

    const onChangeHp = (e) => {
        const { value } = e.target;

        setState({
            ...state,
            전화번호: value
        })
    }

    const getUserData = () => {
        const user_id = sessionStorage.getItem('user_id');
        const form_data = {
            "user_id": user_id
        }

        $.ajax({
            url: 'http://localhost:8080/JSP/essa/update_getjoin_action.jsp',
            type: 'POST',
            data: form_data,
            dataType: 'json',
            success(res) {
                console.log('ajax 성공');
                console.log(res.result);
                setState({
                    ...state,
                    아이디: res.result.아이디,
                    비밀번호: res.result.비밀번호,
                    이름: res.result.이름,
                    이메일: res.result.이메일,
                    전화번호: res.result.전화번호,
                    핸드폰번호: res.result.핸드폰번호,
                    생년: res.result.생년,
                    생월: res.result.생월,
                    생일: res.result.생일
                })
            },
            error(err) {
                console.log('ajax 실패' + err);
            }
        })
    }


    React.useEffect(() => {
        getUserData();
    }, [])

    const onClickSubmit = (e)=>{
        e.preventDefault();

        const url = 'http://localhost:8080/JSP/essa/update_action.jsp';
        const data = new URLSearchParams();
        data.append("user_id", state.아이디)
        data.append("user_pw", state.비밀번호)
        data.append("user_name", state.이름)
        data.append("user_email", state.이메일)
        data.append("user_hp", state.전화번호)
        data.append("user_ph", state.핸드폰번호)
        data.append("user_birth_year", state.생년)
        data.append("user_birth_month", state.생월)
        data.append("user_birth_date", state.생일)

        // let formData = new FormData();
        // formData.append("user_id", state.아이디)
        // formData.append("user_pw", state.비밀번호)
        // formData.append("user_name", state.이름)
        // formData.append("user_email", state.이메일)
        // formData.append("user_hp", state.전화번호)
        // formData.append("user_ph", state.핸드폰번호)
        // formData.append("user_birth_year", state.생년)
        // formData.append("user_birth_month", state.생월)
        // formData.append("user_birth_date", state.생일)


        axios.post(url, data)
        .then((res)=>{
            console.log(res)
        })
        
  

        // $.ajax({
        //     url: 'http://localhost:8080/JSP/essa/update_action.jsp',
        //     type: 'POST',
        //     data: formData,
        //     success(res) {
        //         console.log('ajax 성공!');
        //         console.log(res);
        //         console.log(JSON.parse(res));
        //         alert('회원 정보가 수정완료 됐습니다.^^');

        //     },
        //     error(err) {
        //         console.log('ajax 실패' + err);
        //     }
        // });
    }

    const onSubmitUpdate = (e) => {
        e.preventDefault();

        const formData = {
            "user_id" : state.아아디,
            "user_pw" : state.비밀번호,
            "user_name" : state.이름,
            "user_email" : state.이메일,
            "user_hp" : state.전화번호,
            "user_ph" : state.핸드폰번호,
            "user_birth_year" : state.생년,
            "user_birth_month" : state.생월,
            "user_birth_date" : state.생일
        }
        // formData.append("user_id", state.아이디)
        // formData.append("user_pw", state.비밀번호)
        // formData.append("user_name", state.이름)
        // formData.append("user_email", state.이메일)
        // formData.append("user_ph", state.핸드폰번호)
        // formData.append("user_hp", state.전화번호)
        // formData.append("user_birth_year", state.생년)
        // formData.append("user_birth_month", state.생월)
        // formData.append("user_birth_date", state.생일)

        $.ajax({
            url: 'http://localhost:8080/JSP/essa/update_action.jsp',
            type: 'POST',
            data: formData,
            success(res) {
                console.log('ajax 성공!');
                console.log(res);
                console.log(JSON.parse(res));
                alert('회원 정보가 수정완료 됐습니다.^^');

            },
            error(err) {
                console.log('ajax 실패' + err);
            }
        });
    }




    return (
        <>
            <HeaderComponent />
            <div id='update'>
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <div className="left-box">
                                <div className="sub-menu-box">
                                    <h2>마이페이지</h2>
                                    <ul className='sub-menu-mypage'>
                                        <li className='sub-menu-tit'>
                                            쇼핑정보
                                            <ul className='sub-menu-detail'>
                                                <li className='detail-tit'>주문목록 / 배송조회</li>
                                                <li className='detail-tit'>취소 / 반품 /교환내역</li>
                                                <li className='detail-tit'>환불 / 입금내역</li>
                                                <li className='detail-tit'>찜리스트</li>
                                            </ul>
                                        </li>
                                        <li className='sub-menu-tit'>
                                            혜택관리
                                            <ul className='sub-menu-detail'>
                                                <li className='detail-tit'>쿠폰</li>
                                                <li className='detail-tit'>예치금</li>
                                                <li className='detail-tit'>마일리지</li>
                                            </ul>
                                        </li>
                                        <li className='sub-menu-tit'>
                                            고객센터
                                            <ul className='sub-menu-detail'>
                                                <li className='detail-tit'>1:1 문의</li>
                                            </ul>
                                        </li>
                                        <li className='sub-menu-tit'>
                                            회원정보
                                            <ul className='sub-menu-detail'>
                                                <li className='detail-tit'>회원정보 변경</li>
                                                <li className='detail-tit'>회원 탈퇴</li>
                                                <li className='detail-tit'>배송지 관리</li>
                                            </ul>
                                        </li>
                                        <li className='sub-menu-tit'>
                                            나의 상품문의
                                        </li>
                                        <li className='sub-menu-tit'>
                                            나의 플러스리뷰
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right-box">
                                <div className="mypage-update">
                                    <div className="update-tit">
                                        <h2>회원정보 변경</h2>
                                    </div>
                                    <div className="update-form">
                                        <div className="mypage-inf">
                                            <form action="" name='formJoin' id='formJoin' /* onSubmit={onSubmitUpdate} */>
                                                <div className="member-inf">
                                                    <div className="member-inf-tit">
                                                        <h3>기본정보</h3>
                                                        <span>표시는 반드시 입력하셔야 하는 항목입니다.</span>
                                                    </div>
                                                    <div className="member-base-inf">
                                                        <table border="0" cellPadding="0" cellSpacing="0">
                                                            <colgroup>
                                                                <col width="240px" />
                                                            </colgroup>
                                                            <tbody>
                                                                <tr>
                                                                    <th>
                                                                        <span>아이디</span>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" name='userId' id='userId' onChange={onChangeId} value={state.아이디} disabled={true} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <span>비밀번호</span>
                                                                    </th>
                                                                    <td>
                                                                        <input type="password" name='userPw' id='userPw' onChange={onChangePw} value={state.비밀번호} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th><span>이름</span></th>
                                                                    <td>
                                                                        <input type="text" name='userName' id='userName' onChange={onChangeName} value={state.이름} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <span>이메일</span>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" name='userEmail' id='userEmail' onChange={onChangeEmail} value={state.이메일} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <span>휴대폰번호</span>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" name='userPh' id='userPh' onChange={onChangePh} value={state.핸드폰번호} />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <span>생일</span>
                                                                    </th>
                                                                    <td>
                                                                        <div className="member-birth" >
                                                                            <select className='chosen-single' name="birthYear" style={{ width: "120px" }} onChange={onChangeYear} state={state.생년}>
                                                                                <option value="">년</option>
                                                                                <option value="2023">2023</option>
                                                                                <option value="2022">2022</option>
                                                                                <option value="2021">2021</option>
                                                                                <option value="2020">2020</option>
                                                                                <option value="2019">2019</option>
                                                                                <option value="2018">2018</option>
                                                                                <option value="2017">2017</option>
                                                                                <option value="2016">2016</option>
                                                                                <option value="2015">2015</option>
                                                                                <option value="2014">2014</option>
                                                                                <option value="2013">2013</option>
                                                                                <option value="2012">2012</option>
                                                                                <option value="2011">2011</option>
                                                                                <option value="2010">2010</option>
                                                                                <option value="2009">2009</option>
                                                                                <option value="2008">2008</option>
                                                                                <option value="2007">2007</option>
                                                                                <option value="2006">2006</option>
                                                                                <option value="2005">2005</option>
                                                                                <option value="2004">2004</option>
                                                                                <option value="2003">2003</option>
                                                                                <option value="2002">2002</option>
                                                                                <option value="2001">2001</option>
                                                                                <option value="2000">2000</option>
                                                                                <option value="1999">1999</option>
                                                                                <option value="1998" selected="selected">1998</option>
                                                                                <option value="1997">1997</option>
                                                                                <option value="1996">1996</option>
                                                                                <option value="1995">1995</option>
                                                                                <option value="1994">1994</option>
                                                                                <option value="1993">1993</option>
                                                                                <option value="1992">1992</option>
                                                                                <option value="1991">1991</option>
                                                                                <option value="1990">1990</option>
                                                                                <option value="1989">1989</option>
                                                                                <option value="1988">1988</option>
                                                                                <option value="1987">1987</option>
                                                                                <option value="1986">1986</option>
                                                                                <option value="1985">1985</option>
                                                                                <option value="1984">1984</option>
                                                                                <option value="1983">1983</option>
                                                                                <option value="1982">1982</option>
                                                                                <option value="1981">1981</option>
                                                                                <option value="1980">1980</option>
                                                                                <option value="1979">1979</option>
                                                                                <option value="1978">1978</option>
                                                                                <option value="1977">1977</option>
                                                                                <option value="1976">1976</option>
                                                                                <option value="1975">1975</option>
                                                                                <option value="1974">1974</option>
                                                                                <option value="1973">1973</option>
                                                                                <option value="1972">1972</option>
                                                                                <option value="1971">1971</option>
                                                                                <option value="1970">1970</option>
                                                                                <option value="1969">1969</option>
                                                                                <option value="1968">1968</option>
                                                                                <option value="1967">1967</option>
                                                                                <option value="1966">1966</option>
                                                                                <option value="1965">1965</option>
                                                                                <option value="1964">1964</option>
                                                                                <option value="1963">1963</option>
                                                                                <option value="1962">1962</option>
                                                                                <option value="1961">1961</option>
                                                                                <option value="1960">1960</option>
                                                                                <option value="1959">1959</option>
                                                                                <option value="1958">1958</option>
                                                                                <option value="1957">1957</option>
                                                                                <option value="1956">1956</option>
                                                                                <option value="1955">1955</option>
                                                                                <option value="1954">1954</option>
                                                                                <option value="1953">1953</option>
                                                                                <option value="1952">1952</option>
                                                                                <option value="1951">1951</option>
                                                                                <option value="1950">1950</option>
                                                                                <option value="1949">1949</option>
                                                                                <option value="1948">1948</option>
                                                                                <option value="1947">1947</option>
                                                                                <option value="1946">1946</option>
                                                                                <option value="1945">1945</option>
                                                                                <option value="1944">1944</option>
                                                                                <option value="1943">1943</option>
                                                                                <option value="1942">1942</option>
                                                                                <option value="1941">1941</option>
                                                                                <option value="1940">1940</option>
                                                                                <option value="1939">1939</option>
                                                                                <option value="1938">1938</option>
                                                                                <option value="1937">1937</option>
                                                                                <option value="1936">1936</option>
                                                                                <option value="1935">1935</option>
                                                                                <option value="1934">1934</option>
                                                                                <option value="1933">1933</option>
                                                                                <option value="1932">1932</option>
                                                                                <option value="1931">1931</option>
                                                                                <option value="1930">1930</option>
                                                                                <option value="1929">1929</option>
                                                                                <option value="1928">1928</option>
                                                                                <option value="1927">1927</option>
                                                                                <option value="1926">1926</option>
                                                                                <option value="1925">1925</option>
                                                                                <option value="1924">1924</option>
                                                                                <option value="1923">1923</option>
                                                                                <option value="1922">1922</option>
                                                                                <option value="1921">1921</option>
                                                                                <option value="1920">1920</option>
                                                                                <option value="1919">1919</option>
                                                                                <option value="1918">1918</option>
                                                                                <option value="1917">1917</option>
                                                                                <option value="1916">1916</option>
                                                                                <option value="1915">1915</option>
                                                                                <option value="1914">1914</option>
                                                                                <option value="1913">1913</option>
                                                                                <option value="1912">1912</option>
                                                                                <option value="1911">1911</option>
                                                                                <option value="1910">1910</option>
                                                                                <option value="1909">1909</option>
                                                                                <option value="1908">1908</option>
                                                                                <option value="1907">1907</option>
                                                                                <option value="1906">1906</option>
                                                                                <option value="1905">1905</option>
                                                                                <option value="1904">1904</option>
                                                                                <option value="1903">1903</option>
                                                                                <option value="1902">1902</option>
                                                                                <option value="1901">1901</option>
                                                                                <option value="1900">1900</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="member-birth" >
                                                                            <select className='chosen-single' name="birthYear" style={{ width: "100px" }} onChange={onChangeMonth} state={state.생월}>
                                                                                <option value="">월</option>
                                                                                <option value="01">01</option>
                                                                                <option value="02">02</option>
                                                                                <option value="03">03</option>
                                                                                <option value="04">04</option>
                                                                                <option value="05">05</option>
                                                                                <option value="06">06</option>
                                                                                <option value="07">07</option>
                                                                                <option value="08">08</option>
                                                                                <option value="09" selected="selected">09</option>
                                                                                <option value="10">10</option>
                                                                                <option value="11">11</option>
                                                                                <option value="12">12</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="member-birth" >
                                                                            <select className='chosen-single' name="birthYear" style={{ width: "100px" }} onChange={onChangeDate} state={state.생일}>
                                                                                <option value="">일</option>
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
                                                                                <option value="29" selected="selected">29</option>
                                                                                <option value="30">30</option>
                                                                                <option value="31">31</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>
                                                                        <span>전화번호</span>
                                                                    </th>
                                                                    <td>
                                                                        <input type="text" name='userHp' id='userHp' onChange={onChangeHp} value={state.전화번호} />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="update-btn-box">
                                                        <a href="!#"><button>취소</button></a>
                                                        <Link to='/*'><button type='button' className='update-btn'  onClick={onClickSubmit}>수정하기</button></Link>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}

export default UpdateComponent;