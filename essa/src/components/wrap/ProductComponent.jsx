import React from 'react';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default function ProductComponent() {

  const [state, setState] = React.useState({
    쇼핑: [],
    filter_shopping: [],
    viewnum: 12,
    nav1: '전체',
    nav1_last_click: '전체',
    nav2: ''
  });

  const [basket,setBasket] = React.useState([]);
 
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
    let res = state.쇼핑.filter((item)=>item.제품코드===value);
    setCartClick(res[0]);
 
  }
  const onClickSubmit=(e)=>{
    e.preventDefault();
    onSubmitBasket();
  }

  const getlist = () => {
    const formData = {
        "user_id": sessionStorage.getItem("user_id")
    }
    $.ajax({
        url: 'http://localhost:8080/JSP/essa/basket_list_action.jsp',
        // url :'./data/product.json',
        type: 'POST',
        data: formData,
        dataType: 'json',
        // contentType:'json',
        success(res) {
            console.log('ajax 성공');
            setBasket(res.result);
        },
        error(err) {
            console.log('ajax 실패', err);
        }

    })
}

  React.useEffect(() => {
    getlist();
  }, [isClick])


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


  const getProduct = () => {
    axios({
      url: './data/product.json',
      method: 'GET'
    })
      .then((res) => {
        setState({
          ...state,
          쇼핑: res.data.쇼핑,
          filter_shopping: res.data.쇼핑
        })
        localStorage.setItem('쇼핑', JSON.stringify(res.data.쇼핑));
      })
      .catch((err) => {
        console.log("AXIOS 오류!" + err)
      })
  }

  React.useEffect(()=>{
      console.log('프로덕트 컴포넌트')
      window.scrollTo(0,0);
      localStorage.setItem('쇼핑', JSON.stringify(state.쇼핑));
      getProduct();
  },[]);

  const [list, setList] = React.useState(12);  // 한화면에 보여질 목록개수
  const [pageNumber, setPageNumber] = React.useState(1); // 페이지번호
  const [groupPage] = React.useState(10); // 페이지번호 그룹1(1(1~5) 그룹2(6!~10) 그룹3(11~15) 그룹4(16~20))
  const [cnt, setCnt] = React.useState(1); // 페이지번호 그룹 1

  const [startNum, setStartNum] = React.useState(); // 그룹 시작 번호
  const [endtNum, setEndtNum] = React.useState();  // 그룹 끝 번호
  const [click, setClick] = React.useState('');

  //  페이지번호 클릭 이벤트
  const onClickPageNum = (e, num) => {
    e.preventDefault();
    setPageNumber(num);
    window.scrollTo(0, 0);
  }

  // 그룹페이지 클릭  다음카운트 이벤트
  const onClickNextGroup = (e) => {
    e.preventDefault();
    setCnt(cnt + 1);
    setClick('');
    window.scrollTo(0,0);
  }

  const onClickNextGroupLastPage = (e) => {
    e.preventDefault();
    setCnt(Math.ceil(state.filter_shopping.length / list / groupPage));
    setClick('Last');
    window.scrollTo(0,0);
  }

  // 그룹페이지 클릭  이전카운트 이벤트
  const onClickPrevGroup = (e) => {
    e.preventDefault();
    setCnt(cnt - 1);
    setClick('');
    window.scrollTo(0,0);
  }

  const onClickPrevGroupFirstPage = (e) => {
    e.preventDefault();
    setCnt(1);
    setClick('First');
    window.scrollTo(0,0);
  }

  // 그룹 시작번호 설정 => cnt 또는 groupPage 값 변경이 있거나 설정되었다면 시작번호 설정 실행
  React.useEffect(() => {
    setStartNum((cnt - 1) * groupPage);
  }, [cnt, groupPage]);

  // 그룹 끝번호 설정
  React.useEffect(() => {
    setEndtNum(startNum + groupPage);
  }, [startNum, groupPage]);

  // 그룹 시작페이지 설정 => 그룹페이지 이동시 그룹의 첫페이지 설정
  React.useEffect(() => {
    if (click === '') {
      setPageNumber(startNum + 1);
    }
    else if (click === 'First') {
      setPageNumber(1);
    }
    else if (click === 'Last') {
      setPageNumber(Math.ceil(state.filter_shopping.length / list));
    }
  }, [endtNum, startNum]);

  React.useEffect(() => {
    setList(state.viewnum);
  }, [state.viewnum]);

  const onChangeViewNum = (e) => {
    const {value} = e.target;
    console.log(value)
    setState({
      ...state,
      viewnum: Number(value)
    })
  }

  const mouseenterNav1 = (e) => {
    setState({
      ...state,
      nav1 : e.target.innerHTML
    })
  }

  const mouseleaveNav = (e) => {
    setState({
      ...state,
      nav1 : state.nav1_last_click
    })
  }

  const onClickNav1 = (e) => {
    e.preventDefault();
    
    $('#product .nav-btn').removeClass('on');
    $(e.target).addClass('on');

    let nav1_last_click = '';
    let filter_shopping = '';
    nav1_last_click = e.target.innerHTML;
    if(e.target.innerHTML === '전체'){
      filter_shopping = [...state.쇼핑]
    }
    else if (e.target.innerHTML === '사이즈') {
      filter_shopping = state.쇼핑.filter((item) => item.제품명.includes('인'))
    }
    else if (e.target.innerHTML === '소재') {
      filter_shopping = state.쇼핑.filter(
        (item) => item.제품명.includes('패브릭') ||
          item.제품명.includes('가죽')
      )
    }
    else if (e.target.innerHTML === '타입') {
      filter_shopping = state.쇼핑.filter(
        (item) => item.제품명.includes('헤드기능') ||
          item.제품명.includes('리프트기능') ||
          item.제품명.includes('스윙기능') ||
          item.제품명.includes('카우치') ||
          item.제품명.includes('코너')
      )
    }
    else if (e.target.innerHTML === 'LIFE') {
      filter_shopping = state.쇼핑.filter(
        (item) => item.제품명.includes('데이비드') ||
          item.제품명.includes('스툴') ||
          item.제품명.includes('체어') ||
          item.제품명.includes('러그') ||
          item.제품명.includes('조명')
      )
    }
    else if (e.target.innerHTML === 'LOVE PET') {
      filter_shopping = state.쇼핑.filter(
        (item) => item.제품명.includes('펫')
      )
    }
    setState({
      ...state,
      nav1_last_click: nav1_last_click,
      filter_shopping: filter_shopping
    })
    $('#product .nav-btn').on({
      click(e) {
        $('#product .nav-btn').removeClass('on');
        $(this).addClass('on');
      }
    })
  }

  const onClickNav2 = (e) => {
    e.preventDefault();
    $('#product .nav2-btn').removeClass('on');
    $(e.target).addClass('on');
    let filter_shopping = '';
    filter_shopping = state.쇼핑.filter((item) => item.제품명.includes(e.target.innerHTML));
    setState({
      ...state,
      filter_shopping : filter_shopping,
      nav2 : e.target.innerHTML
    })
  }

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
      제품코드: item.제품코드,
      이미지: item.이미지,
      제품명: item.제품명,
      원가: item.원가,
      할인가: item.할인가,
      할인율: item.할인율,
      리뷰수: item.리뷰수
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

  const onClickSort = (e) => {
    e.preventDefault();
    $('#product .sort_btn').removeClass('on');
    $(e.target).addClass('on');
    
    let filter_shopping = state.filter_shopping;
    if(e.target.innerHTML === '추천순'){
      if(state.nav1 === '전체'){
        filter_shopping = [...state.쇼핑]
      }
      else if(state.nav1 === '사이즈'){
        filter_shopping = state.쇼핑.filter((item) => item.제품명.includes('인'))
      }
      else if(state.nav1 === '소재'){
        filter_shopping = state.쇼핑.filter(
          (item) => item.제품명.includes('패브릭') ||
          item.제품명.includes('가죽')
          )
      }
      else if(state.nav1 === '타입'){
        filter_shopping = state.쇼핑.filter(
          (item) => item.제품명.includes('헤드기능') ||
          item.제품명.includes('리프트기능') ||
          item.제품명.includes('스윙기능') ||
          item.제품명.includes('카우치') ||
          item.제품명.includes('코너')
          )
      }
      else if(state.nav1 === 'LIFE'){
        filter_shopping = state.쇼핑.filter(
          (item) => item.제품명.includes('데이비드') ||
          item.제품명.includes('스툴') ||
          item.제품명.includes('체어') ||
          item.제품명.includes('러그') ||
          item.제품명.includes('조명')
          )
      }
      else if(state.nav1 === 'LOVE PET'){
        filter_shopping = state.쇼핑.filter(
          (item) => item.제품명.includes('펫')
          )
      }
      filter_shopping = filter_shopping.filter((item) => item.제품명.includes(state.nav2));
    }
    else if(e.target.innerHTML === '낮은가격순'){
      filter_shopping.sort((a,b) => {
        return a.원가-b.원가;
      })
    }
    else if(e.target.innerHTML === '높은가격순'){
      let filter_shopping = state.filter_shopping;
      filter_shopping.sort((a,b) => {
        return b.원가-a.원가;
      })
    }
    else if(e.target.innerHTML === '상품평순'){
      let filter_shopping = state.filter_shopping;
      filter_shopping.sort((a,b) => {
        return b.리뷰수-a.리뷰수;
      })
    }
    setState({
      ...state,
      filter_shopping : filter_shopping,
    })
  }




  

  return (
    <>
      <HeaderComponent />
      <div id="product">
        <div className="container">
          <div className="gap">
            <div className="title">
              <h1>Product</h1>
            </div>
            <div className="content">
              <div className="nav" onMouseLeave={mouseleaveNav}>
                <ul>
                  <li><a href="" className='nav-btn on' onClick={onClickNav1}  onMouseEnter={mouseenterNav1} >전체</a></li>
                  <li>
                    <a href="!#" className='nav-btn' onClick={onClickNav1} onMouseEnter={mouseenterNav1}>사이즈</a>
                    {
                      state.nav1 === '사이즈' && (
                        <ul className='subCategory'>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='1인'?'on':''}`} onClick={onClickNav2}>1인</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='3인'?'on':''}`} onClick={onClickNav2}>3인</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='4인'?'on':''}`} onClick={onClickNav2}>4인</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='6인'?'on':''}`} onClick={onClickNav2}>6인</a></li>
                        </ul>
                      )
                    }
                  </li>
                  <li>
                    <a href="" className='nav-btn' onClick={onClickNav1} onMouseEnter={mouseenterNav1} >소재</a>
                    {
                      state.nav1 === '소재' && (
                        <ul className='subCategory'>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='패브릭'?'on':''}`} onClick={onClickNav2}>패브릭</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='가죽'?'on':''}`} onClick={onClickNav2}>가죽</a></li>
                        </ul>
                      )
                    }
                  </li>
                  <li>
                    <a href="" className='nav-btn' onClick={onClickNav1} onMouseEnter={mouseenterNav1} >타입</a>
                    {
                      state.nav1 === '타입' && (
                        <ul className='subCategory'>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='헤드기능'?'on':''}`} onClick={onClickNav2}>헤드기능</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='리프트기능'?'on':''}`} onClick={onClickNav2}>리프트기능</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='스윙기능'?'on':''}`} onClick={onClickNav2}>스윙기능</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='카우치'?'on':''}`} onClick={onClickNav2}>카우치</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='코너'?'on':''}`} onClick={onClickNav2}>코너</a></li>
                        </ul>
                      )
                    }
                  </li>
                  <li>
                    <a href="" className='nav-btn' onClick={onClickNav1} onMouseEnter={mouseenterNav1} >LIFE</a>
                    {
                      state.nav1 === 'LIFE' && (
                        <ul className='subCategory'>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='데이베드'?'on':''}`} onClick={onClickNav2}>데이베드</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='스툴'?'on':''}`} onClick={onClickNav2}>스툴</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='체어'?'on':''}`} onClick={onClickNav2}>체어</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='러그'?'on':''}`} onClick={onClickNav2}>러그</a></li>
                          <li><a href="!#" className={`nav2-btn ${state.nav2==='조명'?'on':''}`} onClick={onClickNav2}>조명</a></li>
                        </ul>
                      )
                    }
                  </li>
                  <li><a href="" className='nav-btn' onClick={onClickNav1} onMouseEnter={mouseenterNav1} >LOVE PET</a></li>
                </ul>
              </div>
              {
                state.nav1_last_click === '전체' &&
                (
                  <div className="best-seller">
                    <div className="text">
                      <div className="t01">Best seller</div>
                      <div className="t02">요즘 가장 많이 구매해 주신 베스트</div>
                    </div>
                    <div className="best-list">
                      <section className='story-main'>
                        <div className="main-box one">
                          <a href="">
                            <div className="overlay"></div>
                            <div className="text hashtag">
                              <p className='t1'>#Swing</p>
                              <p className='t2'>Daze</p>
                            </div>
                            <img src="./img/product/daze.jpg" alt="" />
                          </a>
                        </div>
                        <div className="main-box two">
                          <a href="">
                            <div className="overlay"></div>
                            <div className="text hashtag">
                              <p className='t1'>#Corner</p>
                              <p className='t2'>New Lido</p>
                            </div>
                            <img src="./img/product/newlido.jpg" alt="" />
                          </a>
                        </div>
                        <div className="main-box three">
                          <a href="">
                            <div className="overlay"></div>
                            <div className="text hashtag">
                              <p className='t1'>#Basic</p>
                              <p className='t2'>Clio</p>
                            </div>
                            <img src="./img/product/clio.jpg" alt="" />
                          </a>
                        </div>
                        <div className="main-box four">
                          <a href="">
                            <div className="overlay"></div>
                            <div className="text hashtag">
                              <p className='t1'>#MODULE</p>
                              <p className='t2'>Bagel</p>
                            </div>
                            <img src="./img/product/bagel.jpg" alt="" />
                          </a>
                        </div>
                      </section>
                    </div>
                  </div>
                )
              }
              <div className="category">
                <span className='pick_list_num'>
                  상품
                  <strong>{state.filter_shopping.length}</strong>
                  개
                </span>
                <form name="frmList">
                  <div className="pick_list_box">
                    <ul className='pick_list'>
                      <li>
                        <input type="radio" name="sort" id="sort1" className='radio'  />
                        <label htmlFor="sort1" className='sort_btn on' onClick={onClickSort} >추천순</label>
                      </li>
                      <li>
                        <input type="radio" name="sort" id="sort3" className='radio'  />
                        <label htmlFor="sort3" className='sort_btn' onClick={onClickSort} >낮은가격순</label>
                      </li>
                      <li>
                        <input type="radio" name="sort" id="sort4" className='radio'  />
                        <label htmlFor="sort4" className='sort_btn' onClick={onClickSort} >높은가격순</label>
                      </li>
                      <li>
                        <input type="radio" name="sort" id="sort5" className='radio'  />
                        <label htmlFor="sort5" className='sort_btn' onClick={onClickSort} >상품평순</label>
                      </li>
                    </ul>
                    <div className="choice_num_view">
                      <select name="pageNum" onChange={onChangeViewNum} >
                        <option value="12" selected >12개씩보기</option>
                        <option value="24">24개씩보기</option>
                        <option value="36">36개씩보기</option>
                        <option value="48">48개씩보기</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div className="product_list">
                <ul>
                  {
                    state.filter_shopping.map((item, idx) => {
                      if (Math.ceil((idx + 1) / list) === pageNumber) {
                        return (
                          <li key={item.제품코드}>
                            <div className="item_cont">
                              <div className="photo_box">
                                <Link to={`/쇼핑/상세보기/${item.제품코드}`} onClick={(e)=>onClickProduct(e, item)}>
                                  <img src={`./img/product/${item.이미지}`} alt="" />
                                  <div className="item_link">
                                    <div className="inner" >
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
                      }
                    })
                  }
                </ul>
              </div>
              <div className="pagenation">
                <div className="page-button-box">

                  {cnt > 1 && <a href="!#" className="prev-btn" onClick={onClickPrevGroupFirstPage}>&lt;&lt;</a>}
                  {cnt > 1 && <a href="!#" className="prev-btn" onClick={onClickPrevGroup}>&lt;</a>}
                  {
                    (() => {
                      let arr = [];  // 페이지번호와 a 태그 모두 저장된 배열변수
                      for (let i = startNum; i < endtNum; i++) {
                        if (i < Math.ceil(state.filter_shopping.length / list)) { // 100/6
                          arr = [...arr, <a key={i} data-key={`num${i}`} className={pageNumber === (i + 1) ? 'on' : null} href="!#" onClick={(e) => onClickPageNum(e, (i + 1))}>{i + 1}</a>]
                          // arr.push( <a href="!#" onClick={(e)=>onClickPageNum(e, (i+1))}>{i+1}</a> );
                        }
                      }
                      return arr
                    })()
                  }
                  {cnt < Math.ceil(state.filter_shopping.length / list / groupPage) && <a href="!#" className="next-btn" onClick={onClickNextGroup}>&gt;</a>}
                  {cnt < Math.ceil(state.filter_shopping.length / list / groupPage) && <a href="!#" className="next-btn" onClick={onClickNextGroupLastPage}>&gt;&gt;</a>}

                </div>
              </div>
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
                  <div className="img-box"><img src={cartClick.이미지} alt="" /></div>
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
      <FooterComponent />
    </>
  );
};

