import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

export default function Section4Component ({쇼핑}) {

    const [state,setState] = React.useState({
        sec4Shop : []
    })

    React.useEffect(() => {
        console.log(쇼핑)
        setState({
            ...state,
            sec4Shop : 쇼핑.slice(144,152)
        })
    }, [쇼핑])

    const setViewProduct = (value) => {
        let arr = [];
        if (localStorage.getItem('최근본상품') !== null) {
          arr = JSON.parse(localStorage.getItem('최근본상품'));
          let tmp = [];
          let dup = false;
          if(arr.length > 4){
            tmp = arr.slice(0,4);
            for(let i=0; i<tmp.length; i++){
              if(tmp[i].제품코드 === value.제품코드){
                dup = true;
              }
            }
            if(dup === false){
              arr = [value, ...arr];
            }
          }
          else{
            tmp = arr;
            for(let i=0; i<tmp.length; i++){
              if(tmp[i].제품코드 === value.제품코드){
                dup = true;
              }
            }
            if(dup === false){
              arr = [value, ...arr];
            }
          }
          localStorage.setItem('최근본상품', JSON.stringify(arr));
        }
        else {
          arr = [value]
          localStorage.setItem('최근본상품', JSON.stringify(arr));
        }
      }

    const onClickProduct = (e, item) => {
        // e.preventDefault();
        let obj = {
          제품코드 : item.제품코드,
          이미지 : item.이미지,
          제품명 : item.제품명,
          원가 : item.원가,
          할인가 : item.할인가,
          할인율 : item.할인율,
          리뷰수 : item.리뷰수
        }
        setViewProduct(obj);
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
            "product_num": item.제품코드,
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

    const onMouseEnterShowBtnBox = (e) => {
        e.preventDefault();
        $(e.target).next().animate({opacity:1}, 200)
        $(e.target).next().css({transform : "translateY(0)"})
    }

    const onMouseLeaveHideBtnBox = (e) => {
        e.preventDefault();
        $(e.target).next().animate({opacity: 0}, 200)
        $(e.target).next().css({transform: "translateY(200%)"})
    }

    const[cart,setCart] = React.useState({
        option1:'',
        option2:'',
        cnt:1
      });
      const[cartClick,setCartClick] =React.useState([]);
      const [isCartModal, setIsCartModal] = React.useState(false);
      const [isClick,setIsClick]=React.useState(false);
  
      const onClickExit=(e)=>{
          e.preventDefault();
          setIsCartModal(false);
          setCart({
            ...cart,
            option1:'',
            option2:'',
            cnt:1
          })
        }
      
        const onClickCart = (e, value) => {
          e.preventDefault();
          setIsCartModal(true);
          let res = state.sec4Shop.filter((item)=>item.제품코드===value);
          setCartClick(res[0]);
       
        }
        const onClickSubmit=(e)=>{
          e.preventDefault();
          onSubmitBasket();
        }
        const onSubmitBasket=()=>{
          const formData = {
            "user_id":sessionStorage.getItem('user_id'),
            "product_code":cartClick.제품코드,
            "num":cart.cnt,
            "option1":cart.option1,
            "option2":cart.option2
          }
          console.log(formData);
      
          if(cart.option1===''||cart.option2===''){
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
                    setIsCartModal(false);
                    setCart({
                      ...cart,
                      option1:'',
                      option2:'',
                      cnt:1
                    })
                    setIsClick(!isClick);
                  }
                  else{
                    console.log(res.result)
                    alert('같은 상품을 담을 수 없습니다');
                    setIsCartModal(false);
                    setCart({
                      ...cart,
                      option1:'',
                      option2:'',
                      cnt:1
                    })
                  }
                },
                error(err){
                  console.log('AJAX 실패'+err);
                }
              })
          }
      

        }
      
        const onChangeOption1=(e)=>{
          setCart({
            ...cart,
            option1:e.target.value
          })
        }
        const onChangeOption2=(e)=>{
          setCart({
            ...cart,
            option2:e.target.value
          })
        }
      
        const onChangeCnt=(e)=>{
          setCart({
            ...cart,
            cnt:e.target.value
          })
        }
      
        const onClickUp=(e)=>{
          e.preventDefault();
          let cnt=cart.cnt;
          cnt++;
          setCart({
            ...cart,
            cnt:cnt
          })
          
        }
        const onClickDown=(e)=>{
          e.preventDefault();
          let cnt=cart.cnt;
          if(cnt===1){
            cnt=1;
          }
          else{
            cnt--;
          }
          setCart({
            ...cart,
            cnt:cnt
          }) 
        }
      
        const onClickDel =(e)=>{
          e.preventDefault();
          setCart({
            ...cart,
            option1:'',
            option2:''
          })
        }


    return (
        <>
        <div id='section4'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2 className='main-title'>Weekly Sofa</h2>
                    </div>
                    <div className="content">
                        <div className="title2">
                            <ul>
                                <li>
                                    <a className='on' href="!#">BEST</a> 
                                </li>
                                <li >
                                    <a  className='on' href="!#">SELECT</a>
                                </li>
                            </ul>
                        </div>
                        <ul>
                            {
                                state.sec4Shop.map((item,idx) => {
                                    return (
                                        <li>
                                            <div className="item_cont">
                                                <div className="photo_box">
                                                    <Link to={`/쇼핑/상세보기/${item.제품코드}`} onClick={(e) => onClickProduct(e, item)}>
                                                        <img src={`img/product/${item.이미지}`} alt="" />
                                                        <div className="item_link">
                                                            <div className="inner">
                                                                <button type='button' onClick={(e) => onClickCart(e, item.제품코드)}>
                                                                    <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/data/skin/front/essa2023/img/mimg/cart_thumb.png" alt="" />
                                                                </button>
                                                                <button type='button' className='right' onClick={(e) => onClickZzim(e, item)}>
                                                                    <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/data/skin/front/essa2023/img/mimg/wish_thumb.png" alt="" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="info_box">
                                                    <div className="tit_box">
                                                        <a href="!#">
                                                            <strong className='item_name'>{item.제품명}</strong>
                                                            <span className='item_name_explain'>{item.제품설명}</span>
                                                        </a>
                                                    </div>
                                                    <div className="money_box">
                                                        <span className={`origin_price ${item.할인율 === 0 ? 'on' : ''}`}>{item.원가.toLocaleString('ko-KR')}원</span>
                                                        <span className='sale_price' style={{ "display": `${item.할인가 === 0 ? 'none' : 'inline'}` }}>{item.할인가.toLocaleString('ko-KR')}원</span>
                                                        <span className='sale_per' style={{ "display": `${item.할인가 === 0 ? 'none' : 'inline'}` }}>{item.할인율}%</span>
                                                    </div>
                                                    <div className="icon_box">
                                                        <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/data/icon/goods_icon/i_boutique.png" alt="" />
                                                        <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/data/icon/goods_icon/i_essamall_.png" alt="" />
                                                    </div>
                                                    <div className="review_cnt">
                                                        <a href="!#">
                                                            <i className='xi-comment-o'></i>
                                                            <span>{item.리뷰수}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
                      {
                        isCartModal && (
                          <div className="cart-modal">
                            <div className="container">
                              <div className="content">
                                <div className="row1">
                                  <h2>옵션선택</h2>
                                  <a href="!#" onClick={onClickExit}><img src="./img/product/btn_layer_close.png" alt="" /></a>
                                </div>
                                <div className="row2">
                                  <div className="img-box"><img src={`img/product/${cartClick.이미지}`} alt="" /></div>
                                  <div className="txt">
                                    <h3>{cartClick.제품명}</h3>
                                  </div>
                                </div>
                                <div className="row3">
                                  <dl>
                                    <dt>패브릭타입</dt>
                                    <dd>
                                      <select name="optionNo1"  onChange={onChangeOption1} value={cart.option1}>
                                        <option value='' selected disabled={`${cart.option1 !== '' ? true : false}`}>= 패브릭타입 선택 =</option>
                                        <option value="카시미라">카시미라</option>
                                        <option value="러스티카">러스티카</option>
                                      </select>
                                    </dd>
                                  </dl>
                                  <dl>
                                    <dt>색상</dt>
                                    <dd>
                                      <select name="optionNo2"  onChange={onChangeOption2} value={cart.option2}>
                                        <option value='' selected disabled={`${cart.option2 !== '' ? true : false}`}>= 색상 선택 =</option>
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
                                  <div className="goods-box"  style={{"display":`${cart.option1!==''&cart.option2!==''?"block":"none"}`}}>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>{cart.option1}/{cart.option2}</td>
                                      <td>
                                        <div className="count">
                                          <input type="text"  onChange={onChangeCnt} value={cart.cnt}/>
                                          <span>
                                            <button className='up' onClick={onClickUp} ></button>
                                            <button className='down' onClick={onClickDown}></button>
                                          </span>
                                        </div>
                                      </td>
                                      <td>{cartClick.할인가!==0?((cartClick.할인가)*cart.cnt).toLocaleString('ko-KR'):((cartClick.원가)*cart.cnt).toLocaleString('ko-KR')}원</td>
                                      <td>
                                        <button onClick={onClickDel}><img src="./img/product/ico_cart_del.png" alt="" /></button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                                </div>
                                <div className="row4">
                                  <button onClick={onClickExit}>취소</button>
                                  <button className='ok' onClick={onClickSubmit} type='submit'>확인</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      </>
    );
};

