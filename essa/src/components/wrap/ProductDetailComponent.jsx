import React from 'react';
import { useParams } from 'react-router-dom';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import $ from 'jquery';

export default function ProductDetailComponent () {

  const {id} = useParams();

  const [state,setState]=React.useState({
      쇼핑:{},
      option1:'',
      option2:'',
      cnt:1
  });

  React.useState(()=>{

    window.scrollTo(0,0);

    const data = JSON.parse(localStorage.getItem('쇼핑'));
    let res = data.filter((item)=>
      item.제품코드 ===Number(id)
    )
   
    setState({
      ...state,
      쇼핑 :res[0]
    })

  },[]);

  const onChangeOption1=(e)=>{
    setState({
      ...state,
      option1:e.target.value
    })
  }
  const onChangeOption2=(e)=>{
    setState({
      ...state,
      option2:e.target.value
    })
  }

  const onChangeCnt=(e)=>{
    setState({
      ...state,
      cnt:e.target.value
    })
  }

  const onClickUp=(e)=>{
    e.preventDefault();
    let cnt=state.cnt;
    cnt++;
    setState({
      ...state,
      cnt:cnt
    })
    
  }
  const onClickDown=(e)=>{
    e.preventDefault();
    let cnt=state.cnt;
    if(cnt===1){
      cnt=1;
    }
    else{
      cnt--;
    }
    setState({
      ...state,
      cnt:cnt
    }) 
  }

  const onClickDel =(e)=>{
    e.preventDefault();
    setState({
      ...state,
      option1:'',
      option2:''
    })
  }

  const onClickSubmit=(e)=>{
    e.preventDefault();
    onSubmitBasket();
  }

    const onSubmitBasket=()=>{
    const formData = {
      "user_id":sessionStorage.getItem('user_id'),
      "product_code":state.쇼핑.제품코드,
      "num":state.cnt,
      "option1":state.option1,
      "option2":state.option2
    }
    if(state.option1===''||state.option2===''){
      alert('옵션이 선택되지 않았습니다!');
    }
    else if (sessionStorage.getItem('user_id') === null) {
      alert('로그인 후 이용해주세요');
      window.location.href='/#/로그인';
    }
    else{
      $.ajax({
        url:'http://localhost:8080/JSP/essa/basket_post_action.jsp',
        type:'post',
        data:formData,
        dataType:'json',
        success(res){
          console.log('AJAX 성공');
          console.log(res.result);
          if(res.result === 1){
            alert('상품이 장바구니에 담겼습니다.');
          }
          else{
            console.log(res.result)
            alert('같은 상품을 담을 수 없습니다');
          }
        },
        error(err){
          console.log('AJAX 실패'+err);
        }
      })
    }


  }

  const onClickZzim = (e, item) => {
    e.preventDefault();
    let user_id = '';
    if (sessionStorage.getItem('user_id') === null) {
      alert('로그인 후 이용해주세요');
      window.location.href='/#/로그인';
    }
    else {
      user_id = sessionStorage.getItem('user_id');
      const formData = {
        "user_id": user_id,
        "product_num": item,
        "amount": 1
      }
  
      $.ajax({
        url: 'http://localhost:8080/JSP/essa/zzim_post_action.jsp',
        type: 'POST',
        data: formData,
        dataType:'json',
        success(res) {
          console.log('AJAX 성공!');
          console.log(res);
          console.log(res.result);
          if(res.result === 1){
            alert('상품이 찜 리스트에 담겼습니다!')
          }
          else{
            alert('같은 상품을 담을 수 없습니다')
          }
        },
        error(err) {
          console.log('AJAX 실패!' + err);
        }
      })
    }
  }

  return (
    <>
      <HeaderComponent />
      <div id="productDetail">
        <div className="container">
          <div className="content">
            <div className="item_photo">
              <img src={`./img/product/${state.쇼핑.이미지}`} alt="" />
            </div>
            <div className="item_info">
              <div className="tit">
                <h2>{state.쇼핑.제품명} </h2>
                <h3>{state.쇼핑.제품설명} </h3>
              </div>
              <div className="price">
                <div className="sale_per" style={{"display":`${state.쇼핑.할인율===0?'none':'inline'}`}}>
                  {state.쇼핑.할인율}% 
                </div>
                <div className="sale_price" >
                  {`${state.쇼핑.할인가===0?(Number)(state.쇼핑.원가).toLocaleString('ko-KR'):(Number)(state.쇼핑.할인가).toLocaleString('ko-KR')}`}원
                </div>
                <div className="origin_price" style={{"display":`${state.쇼핑.할인율===0?'none':'inline'}`}}>
                {(Number)(state.쇼핑.원가).toLocaleString('ko-KR')}원
                </div>
                <div className="cardinfo">
                  <button>무이자 안내</button>
                  <a href="!#">
                    <img src="./img/product/cardinfo.svg" alt="" />
                  </a>
                </div>
              </div>
              <div className="item_choice">
                <div className="item_choice_option">
                  <dl>
                    <dt>패브릭타입</dt>
                    <dd>
                      <select name="optionNo1" onChange={onChangeOption1} value={state.option1}>
                        <option value='' selected disabled={`${state.option1!==''?true:false}`}>= 패브릭타입 선택 =</option>
                        <option value="카시미라">카시미라</option>
                        <option value="러스티카">러스티카</option>
                      </select>
                    </dd>
                  </dl>
                  <dl>
                    <dt>색상</dt>
                    <dd>
                      <select name="optionNo2" onChange={onChangeOption2} value={state.option2}>
                        <option value='' selected disabled={`${state.option2!==''?true:false}`}>= 색상 선택 =</option>
                        <option value="바닐라화이트">바닐라화이트</option>
                        <option value="토프그레이">토프그레이</option>
                        <option value="피콕그린">피콕그린</option>
                        <option value="비스크옐로우">비스크옐로우</option>
                        <option value="아쿠아블루">아쿠아블루</option>
                        <option value="울프블루">울프블루</option>
                        <option value="카민레드">카민레드</option>
                        <option value="더스티핑크">더스티핑크</option>
                        <option value="머스크화이트">머스크화이트</option>
                        <option value="스톤그레이">스톤그레이</option>
                        <option value="선셋오렌지">선셋오렌지</option>
                        <option value="빈센트블루">빈센트블루</option>
                        <option value="인디고블루">인디고블루</option>
                        <option value="민트">민트</option>
                        <option value="블루그레이">블루그레이</option>
                      </select>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="banner">
                <a href="https://shcard.io/ESSA">
                  <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/site/re2023/pc/goods_view/goods_view_sh_bn.jpg" alt=""/>
                </a>
              </div>
              <div className="goods-box" style={{"display":`${state.option1!==''&state.option2!==''?"block":"none"}`}}>
                <table>
                  <tbody>
                    <tr>
                      <td>{state.option1}/{state.option2}</td>
                      <td>
                        <div className="count">
                          <input type="text" onChange={onChangeCnt} value={state.cnt}/>
                          <span>
                            <button className='up' onClick={onClickUp}></button>
                            <button className='down' onClick={onClickDown}></button>
                          </span>
                        </div>
                      </td>
                      <td>{state.쇼핑.할인가!==0?((state.쇼핑.할인가)*state.cnt).toLocaleString('ko-KR'):((state.쇼핑.원가)*state.cnt).toLocaleString('ko-KR')}원</td>
                      <td>
                        <button onClick={onClickDel}><img src="./img/product/ico_cart_del.png" alt="" /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="total" style={{"display":`${state.option1!==''&state.option2!==''?"block":"none"}`}}>
                <div className="row1">
                  <h5>총 상품금액<span>{((state.쇼핑.원가)*state.cnt).toLocaleString('ko-KR')}원</span></h5>
                  <h6 style={{"display":`${state.쇼핑.할인가===0?"none":"block"}`}}>총 할안금액<span>-{((state.쇼핑.원가-state.쇼핑.할인가)*state.cnt).toLocaleString('ko-KR')}원</span></h6>
                </div>
                <div className="row2">
                  <h3>총 합계금액<span>{state.쇼핑.할인가!==0?((state.쇼핑.할인가)*state.cnt).toLocaleString('ko-KR'):((state.쇼핑.원가)*state.cnt).toLocaleString('ko-KR')}원</span></h3>
                </div>
              </div>
              <div className="btn-box">
                <button className='heart' onClick={(e) => onClickZzim(e, state.쇼핑.제품코드)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.639 4.38981L12.1111 4.86562L12.5832 4.38981C14.8649 2.09006 18.5621 2.09006 20.8438 4.38981C23.1284 6.69247 23.1284 10.428 20.8438 12.7306L12.4396 21.2012C12.2627 21.3796 11.9596 21.3796 11.7826 21.2012L3.37844 12.7306C1.09385 10.428 1.09385 6.69247 3.37844 4.38981C5.66015 2.09006 9.35733 2.09006 11.639 4.38981Z" stroke="#1A1A1A" stroke-width="1.33"></path></svg>
                </button>
                <button className='cart' onClick={onClickSubmit} type='submit' >장바구니</button>
                <button className='buy'>바로구매</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
