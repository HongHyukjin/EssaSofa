import React from 'react';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import $ from 'jquery';
import axios from 'axios';
import MypageNavComponent from './MypageNavComponent';

function ZzimComponent(props) {

    const [state,setState] = React.useState({
        이름 : '',
        아이디 : '',
        checked : []
    })

    const [zzim,setZzim] = React.useState([]);

    const [product,setProduct] = React.useState([]);

    const [isDelModal, setIsDelModal] = React.useState(false);

    const onClickDelModal = (e,value) => {
    
        if(value==='확인'){
            for (let i = 0; i < state.checked.length; i++) {
                const formData = {
                    "user_id": sessionStorage.getItem('user_id'),
                    "product_num": Number(state.checked[i])
                }
                $.ajax({
                    url : 'http://localhost:8080/JSP/essa/zzim_delete_action.jsp',
                    type : 'POST',
                    data : formData,
                    dataType : 'json',
                    success(res){
                        console.log('AJAX 성공');
                        console.log(res);
                        window.location.reload();
                    },
                    error(err){
                        console.log('AJAX 실패');
                    }
                })
            }
        }
        setIsDelModal(false);
    }

    const myStyle = {
        width: '100px'
    };

    const myStyle2 = {
        width : '707px'
    };
    const myStyle3 = {
        width : '204px'
    };

    const getUserData = async () => {
        try {
            const user_id = sessionStorage.getItem('user_id');
            const form_data = {
                "user_id" : user_id
            };

            const res = await $.ajax({
                url : 'http://localhost:8080/JSP/essa/update_getjoin_action.jsp',
                type : 'POST',
                data : form_data,
                dataType: 'json'
            });

            console.log('ajax 성공');
            console.log(res.result);
            setState((prevState)=>({
                ...prevState,
                이름 : res.result.이름 === "null" ? '' : res.result.이름,
                아이디 : res.result.아이디 === "null" ? '' : res.result.아이디
            }));
        }
        catch (err){
            console.log('ajax 실패' + err);
        } 
    }

    const getZzim = () => {
        let user_id = '';
        user_id = sessionStorage.getItem('user_id');
        const formData = {
            user_id : user_id
        }
        $.ajax({
            url : 'http://localhost:8080/JSP/essa/zzim_select_action.jsp',
            type : 'POST',
            data : formData,
            dataType : 'json',
            success(res){
                console.log('AJAX 성공');
                console.log(res);
                setZzim(res.result);
            },
            error(err){
                console.log('AJAX 실패');
            }
        })

    }

    const getProduct = () => {
        axios({
          url: './data/product.json',
          method: 'GET'
        })
          .then((res) => {
            setProduct(res.data.쇼핑);
          })
          .catch((err) => {
            console.log("AXIOS 오류!" + err)
          })
    }
    
    React.useEffect(()=>{
        getUserData();
        getProduct();
        getZzim();
    },[]);

    const onClickDeleteZzim =(e,item) => {
        e.preventDefault();
        let user_id = '';
        if(sessionStorage.getItem('user_id') === null){
        user_id = 'gurwlszx';
        }
        else{
        user_id = sessionStorage.getItem('user_id');
        }
        const formData = {
            user_id : user_id,
            product_num : item.product_num
        }
        $.ajax({
            url : 'http://localhost:8080/JSP/essa/zzim_delete_action.jsp',
            type : 'POST',
            data : formData,
            dataType : 'json',
            success(res){
                console.log('AJAX 성공');
                console.log(res);
                window.location.reload();
            },
            error(err){
                console.log('AJAX 실패');
            }
        })
    }

    const onClickDeleteCheck = (e) => {
        e.preventDefault();
        setIsDelModal(true);
    }

    const onClickCheckAll = (e) => {
        let checked = [];
        console.log('check all')

        if (e.target.checked) {
            for (let i = 0; i < zzim.length; i++) {
                checked = [...checked, zzim[i].product_num];
            }
        }
        else {
            checked = [];
        }

        setState({
            ...state,
            checked: checked,
        })
    }

    const onClickCheck = (e, value) => {

        let checked = state.checked;

        if (e.target.checked) {
            checked = [...checked, (value)];
        }
        else {
            checked = checked.filter((item) => item !== value);
        }

        setState({
            ...state,
            checked: checked,
        })
    }


    return (
        <>
        <HeaderComponent/>
        <div id='zzim'>
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <MypageNavComponent />
                        <div className="right-box">
                            <div className="mypage-main">
                                <div className="mypage-row1">
                                    <div className="mypage-name-box">
                                        <div className="name-box">
                                            <span className='user-name'>{state.이름}</span>
                                            <p>{state.아이디}</p>
                                        </div>
                                    </div>
                                    <div className="mypage-point-box">
                                        <ul>
                                            <li><span><em>쿠폰</em><strong>0</strong>장</span></li>
                                            <li><span><em>마일리지</em><strong>20,000</strong>원</span></li>
                                            <li><span><em>예치금</em><strong>0</strong>원</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mypage-row2">
                                    <div className="mypage-order-tit">
                                        <h3>찜리스트</h3>
                                    </div>
                                    <div className="mypage-myinfo-box">
                                        <div className="myinfo-table">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th style={myStyle}>
                                                            <div className="form-check">
                                                                <input type="checkbox" id='allCheck' name='allCheck' onClick={onClickCheckAll} checked={state.checked.length === zzim.length} />
                                                            </div>
                                                        </th>
                                                        <th style={myStyle2}>상품명/옵션</th>
                                                        <th style={myStyle3}>상품금액/수량</th>
                                                        <th style={myStyle3}>혜택</th>
                                                        <th>합계</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        zzim.length === 0 && product.length === 0 && (
                                                            <tr className='info-answer'>
                                                                <td colSpan="6">
                                                                    <p>찜리스트에 상품이 없습니다.</p>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                    {
                                                        zzim.length !== 0 && product.length !== 0 && (
                                                            zzim.map((item,idx) => {
                                                                return (
                                                                        <tr key={idx}>
                                                                            <td>
                                                                                <div className="form-check">
                                                                                    <input type="checkbox" id='Check' name='Check' onClick={(e) => onClickCheck(e, item.product_num)} checked={state.checked.includes(item.product_num)}/>
                                                                                </div>
                                                                            </td>
                                                                            <td className='td_left'>
                                                                                <div className="pick_add_cont">
                                                                                    <span className='pick_add_img'>
                                                                                        <a href="!#"><img src={`./img/product/${product[item.product_num-1].이미지}`} alt="" /></a>
                                                                                    </span>
                                                                                    <div className="pick_add_info">
                                                                                        <em>
                                                                                            <a href="!#">{product[item.product_num-1].제품명}</a>
                                                                                        </em>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <strong>{product[item.product_num-1].할인가===0?product[item.product_num-1].원가.toLocaleString('ko-KR'):product[item.product_num-1].할인가.toLocaleString('ko-KR')}</strong>
                                                                                /{item.amount}개
                                                                                <div class="btn_gray_list">
                                                                                    <a href="!#">
                                                                                        <span>옵션/수량변경</span>
                                                                                    </a>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <ul className='benefit_list'>
                                                                                    <li className='benefit_sale'>
                                                                                        <em>할인</em>
                                                                                        <span>
                                                                                            상품
                                                                                            <strong>{product[item.product_num-1].할인가===0?'-0원':`-${(product[item.product_num-1].원가/100*product[item.product_num-1].할인율).toLocaleString('ko-KR')}원`}</strong>
                                                                                        </span>
                                                                                    </li>
                                                                                </ul>
                                                                            </td>
                                                                            <td>
                                                                                <div>
                                                                                    <a href="!#" className='btn_wish_del' onClick={(e)=>onClickDeleteZzim(e,item)}>
                                                                                        <em>삭제하기</em>
                                                                                    </a>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                )
                                                            })
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            <button onClick={onClickDeleteCheck}>선택 상품 삭제</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {
                isDelModal && (
                    <div className="delete-modal">
                        <div className="container">
                            <div className="content">
                                <div className="txt">
                                    {state.checked.length > 0 ? <h3>선택하신 {state.checked.length}개상품을 장바구니에서 삭제 하시겠습니까?</h3> : <h3 style={{ "textAlign": "center" }}>선택하신 상품이 없습니다.</h3>}

                                </div>
                                <div className="btn">
                                    <button style={{ "width": `${state.checked.length === 0 ? "0" : "50%"}` }} onClick={(e) => onClickDelModal(e, '확인')}>확인</button>
                                    <button style={{ "width": `${state.checked.length === 0 ? "100%" : "0"}` }} onClick={(e) => onClickDelModal(e, '')}>확인</button>
                                    <button style={{ "width": `${state.checked.length === 0 ? "0" : "50%"}` }} onClick={(e) => onClickDelModal(e, '취소')}>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        <FooterComponent/>
        </>
    );
}

export default ZzimComponent;