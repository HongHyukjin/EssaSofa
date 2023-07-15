import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

export default function HeaderComponent() {

    const [state, setState] = React.useState({
        isLogin : false
    })
    const [cart,setCart] = React.useState([]);

    React.useEffect(()=>{
        const stored_id = sessionStorage.getItem('user_id');
        let isLogin = false;
        if(stored_id !==null){
            isLogin =true;
        }
        else {
            isLogin =false;
        }
        setState({
            ...state,
            isLogin : isLogin,
        })

    },[])

    const getlist = () => {
        const formData = {
            "user_id": sessionStorage.getItem("user_id")
        }
        $.ajax({
            url: 'http://localhost:8080/JSP/essa/basket_list_action.jsp',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success(res) {
                console.log('ajax 성공');
                setCart(res.result);
            },
            error(err) {
                console.log('ajax 실패', err);
            }

        })
    }

    const onClickLogout=(e)=>{
        e.preventDefault();
        sessionStorage.removeItem('user_id');
        setState({
            ...state,
            isLogin : false
        })
        window.location.href="/";
    }

    const onClickMyPage = (e)=>{
        e.preventDefault();
        if(sessionStorage.getItem('user_id')!==null){
            window.location.href="#/마이페이지";
        }
        else{
            alert('로그인 후 이용해 주세요');
            window.location.href="#/로그인";
        }
    }
    const onClickCart=(e)=>{
        e.preventDefault();
        if(sessionStorage.getItem('user_id')!==null){
            window.location.href="#/장바구니";
        }
        else{
            alert('로그인 후 이용해 주세요');
            window.location.href="#/로그인";
        }
    }

    const getUserData=()=>{
        const user_id = sessionStorage.getItem('user_id');
        const form_data ={
            "user_id" : user_id
        }

        $.ajax({
            url : 'http://localhost:8080/JSP/essa/update_getjoin_action.jsp',
            type : 'POST',
            data : form_data,
            dataType : 'json',
            success(res){
                // console.log('ajax 성공');
                // console.log(res.result);
                setState({
                    ...state,
                    user_id : user_id
                })
            },
            errer(err){
                console.log('ajax 실패' + err);
            },
        })
    }

    React.useEffect(()=>{
        if(state.isLogin===true){
            getUserData();
            
        }
    },[state.isLogin])
    React.useEffect(()=>{
        getlist();
    },[]);

    React.useEffect(()=>{


        let newScroll = $(window).scrollTop();  
        let oldScroll = newScroll;   
      
        $(window).scroll(function(){
         

            newScroll = $(window).scrollTop();

            if(newScroll-oldScroll>0){
                $('#header').css({"top":"-73px"});
   
            }
            if(newScroll-oldScroll<0){
                $('#header').css({"top":"-0"});
      
            }
            oldScroll=newScroll;
        });


        $('.sub-up').on({
            mouseenter(){
                $(this).next().css({"display":"block"});
            }
        });
    
        $('.sub-page').on({
            mouseleave(){
                $('.sub').css({"display":"none"});
            }
        });
    });





    return (
        <header id='header'>
            <div className="container">
                <div className="gap">
                    <div className="logo">
                        <Link to='/메인'>
                            <svg width="100" viewBox="0 0 301.89 89.15" fill="#fff"><g><polygon className="st0" points="23.88,51.81 57.78,51.81 57.78,38.02 23.88,38.02 23.88,19.26 61.29,19.26 61.29,5.6 6.65,5.6 6.65,83.4 64.85,83.4 64.85,69.41 23.88,69.41"></polygon><path className="st0" d="M104.78,3.22c-13.27,0-27.47,7.62-27.47,23.84c0,29.47,43.72,18.66,43.72,35.43c0,8.06-8.64,9.82-14.3,9.82c-5.87,0-14.32-1.41-16.16-11.35H75c1.56,17.16,15.61,24.82,31.12,24.82c20.06,0,30.55-10.82,30.55-25.28c0-17.88-16.36-21.52-21.81-22.96c-18.41-4.75-21.91-6.07-21.91-11.92c0-6.62,5.97-8.94,11.11-8.94c4.95,0,12.28,0.34,14.39,9.05h15.62C132.66,9.64,119.28,3.22,104.78,3.22"></path><path className="st0" d="M187.63,37.55c-18.41-4.75-21.91-6.07-21.91-11.92c0-6.62,5.96-8.94,11.11-8.94c4.95,0,12.28,0.34,14.38,9.05h15.62c-1.42-16.1-14.79-22.52-29.29-22.52c-13.27,0-27.47,7.62-27.47,23.84c0,29.47,43.72,18.66,43.72,35.43c0,8.06-8.64,9.82-14.3,9.82c-5.87,0-14.32-1.41-16.16-11.35h-15.58c1.55,17.16,15.61,24.82,31.12,24.82c20.06,0,30.55-10.82,30.55-25.28C209.44,42.62,193.08,38.98,187.63,37.55"></path><path className="st0" d="M261.87,5.76h-7.8h-0.01h-0.15h-0.01h-7.8l-32.04,77.48h16.17l7.31-17.88h32.87l7.31,17.88h16.17L261.87,5.76zM243.28,51.37l10.71-26.18l10.71,26.18H243.28z"></path></g></svg>
                        </Link>
                    </div>
                    <div className="col col1">
                        <ul>
                            <li className='sub-page'>
                                <Link className='sub-up' to='/쇼핑'><h3>PRODUCT</h3></Link>
                                <div className="sub sub1">
                                    <div className="container">
                                        <div className="col1">
                                            <a href="!#">소파 전체보기</a>
                                        </div>
                                        <div className="col2">
                                            <ul>
                                                <li><a  href="!#">사이즈<i className='plus'></i></a></li>
                                                <li>
                                                    <ul>
                                                        <li><a href="!#">1인<span>1000mm</span></a></li>
                                                        <li><a href="!#">3인<span>1600~2600mm</span></a></li>
                                                        <li><a href="!#">3.5인<span>2600~2800mm</span></a></li>
                                                        <li><a href="!#">컴팩트 4인<span className='long'>2800~2950mm</span></a></li>
                                                        <li><a href="!#">4인<span>2950~3500mm</span></a></li>
                                                        <li><a href="!#">6인<span>3500mm~</span></a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li><a href="!#">소재<i className='plus'></i></a></li>
                                                <li>
                                                    <ul>
                                                        <li><a href="!#">패브릭</a></li>
                                                        <li><a href="!#">가죽</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li><a href="!#">타입<i className='plus'></i></a></li>
                                                <li>
                                                    <ul>
                                                        <li><a href="!#">일반형</a></li>
                                                        <li><a href="!#">헤드기능</a></li>
                                                        <li><a href="!#">리프트기능</a></li>
                                                        <li><a href="!#">스윙기능</a></li>
                                                        <li><a href="!#">리클라이너</a></li>
                                                        <li><a href="!#">모듈</a></li>
                                                        <li><a href="!#">코너</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col3">
                                            <ul>
                                                <li><a href="!#">LIFE<i className='plus'></i></a></li>
                                                <li>
                                                    <ul>
                                                        <li><a href="!#">데이베드</a></li>
                                                        <li><a href="!#">스툴</a></li>
                                                        <li><a href="!#">체어</a></li>
                                                        <li><a href="!#">러그</a></li>
                                                        <li><a href="!#">조명</a></li>
                                                        <li><a href="!#">쿠션</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li><a href="!#">LOVE PET</a></li>
                                            </ul>
                                        </div>
                                        <div className="col4">
                                            <ul>
                                                <li><a href="!#"><img src="./img/bn_careservice.jpg" alt="" /></a></li>
                                                <li><a href="!#"><img src="./img/menu_banner1.jpg" alt="" /></a></li>
                                                <li><p>LIEB FABRIC</p></li>
                                                <li><span>혁신적인 기능과 부드러움을 동시에</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='sub-page'>
                                <a className='sub-up' href="!#"><h3  className='dot'>고객리뷰</h3></a>
                                <div className="sub sub2">
                                    <div className="container">
                                        <div className="sub2-col1">
                                            <ul>
                                                <li><a href="!#">포토리뷰</a></li>
                                                <li><a href="!#">Best 리뷰</a></li>
                                                <li><a href="!#">리뷰사은품 신청 안내</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><a href="!#"><h3  className='dot'>기획전/쿠폰</h3></a></li>
                            <li><a href="!#"><h3>BEST</h3></a></li>
                            <li><a href="!#" className='pet'><h3>#펫라인런칭</h3></a></li>
                        </ul>
                    </div>
                    <div className="col col2">
                        <ul>
                            <li><a href="!#"><h3 className='dot'>STORY</h3></a></li>
                            <li><a href="!#"><h3>스토어 안내</h3></a></li>
                            <li><Link to="/고객센터"><h3>고객센터</h3></Link></li>
                            <li className='sub-page'>
                                <a className='sub-up' href="!#"><h3>ABOUT</h3></a>
                                <div className="sub sub3">
                                    <div className="container">
                                        <div className="sub3-col1">
                                            <ul>
                                                <li><a href="!#">About ESSA</a></li>
                                                <li><a href="!#">History</a></li>
                                                <li><a href="!#">안전한 ESSA</a></li>
                                                <li><a href="!#">기능성 패브릭</a></li>
                                                <li><a href="!#">프리미엄 가죽</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col col3">
                        <ul>
                            <li className='sub-page'>
                                {
                                    sessionStorage.getItem('user_id') && (
                                        <Link className='sub-up' to="/마이페이지"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.25 10C23.25 14.0041 20.0041 17.25 16 17.25C11.9959 17.25 8.75 14.0041 8.75 10C8.75 5.99594 11.9959 2.75 16 2.75C20.0041 2.75 23.25 5.99594 23.25 10Z" stroke="#fff" strokeWidth="1.5"></path><g clipPath="url(#clip0_172_2334)"><rect x="2.75" y="21.75" width="26.5" height="22.5" rx="11.25" stroke="#fff" strokeWidth="1.5"></rect></g><defs><clipPath id="clip0_172_2334"><rect width="28" height="9" fill="white" transform="translate(2 21)"></rect></clipPath></defs></svg></Link>
                                    )
                                }
                                {
                                    !sessionStorage.getItem('user_id') && (
                                        <Link className='sub-up' to="/로그인"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.25 10C23.25 14.0041 20.0041 17.25 16 17.25C11.9959 17.25 8.75 14.0041 8.75 10C8.75 5.99594 11.9959 2.75 16 2.75C20.0041 2.75 23.25 5.99594 23.25 10Z" stroke="#fff" strokeWidth="1.5"></path><g clipPath="url(#clip0_172_2334)"><rect x="2.75" y="21.75" width="26.5" height="22.5" rx="11.25" stroke="#fff" strokeWidth="1.5"></rect></g><defs><clipPath id="clip0_172_2334"><rect width="28" height="9" fill="white" transform="translate(2 21)"></rect></clipPath></defs></svg></Link>
                                    )
                                }
                                <div className="sub  mypage">
                                    <div className="container-my">
                                        {
                                            !state.isLogin && (
                                                <div className="one">
                                                    <Link to="/로그인">로그인</Link>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#333" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="12" transform="translate(14.5674 7.41992) rotate(30)" fill="#111"></rect></svg>
                                                    <Link to="/회원가입">회원가입</Link>
                                                </div>
                                            )
                                        }
                                        {
                                            state.isLogin && (
                                                <div className="one">
                                                    <Link to="/메인" onClick={onClickLogout}>로그아웃</Link>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#333" xmlns="http://www.w3.org/2000/svg"><rect width="2" height="12" transform="translate(14.5674 7.41992) rotate(30)" fill="#111"></rect></svg>
                                                    <Link to="/회원정보수정">회원정보수정</Link>
                                                </div>
                                            )
                                        }
                                        <div className="two">
                                            <ul>
                                                <li><Link to="/마이페이지"  onClick={onClickMyPage} >마이페이지</Link></li>
                                                <li><a href="!#">주문/배송조회</a></li>
                                                <li><Link to="/찜페이지">관심상품</Link></li>
                                                <li><a href="!#">쿠폰</a></li>
                                            </ul>
                                        </div>
                                        <div className="three">
                                            <Link to="/마이페이지">최근 본 상품</Link>
                                        </div>
                                        <div className="four">
                                            <Link to="/고객센터">고객센터</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><Link to="/장바구니" onClick={onClickCart}><span>{cart.length}</span><svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.75" y="6.75" width="22.5" height="20.5" rx="3.25" stroke="#fff" strokeWidth="1.5"></rect><g clipPath="url(#clip0_1090_1570)"><rect x="5.75" y="0.75" width="12.5" height="26.5" rx="3.25" stroke="#fff" strokeWidth="1.5"></rect></g><defs><clipPath id="clip0_1090_1570"><rect width="14" height="11" fill="white" transform="translate(5)"></rect></clipPath></defs></svg></Link></li>
                            <li><a href="!#"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.25 14C25.25 20.2132 20.2132 25.25 14 25.25C7.7868 25.25 2.75 20.2132 2.75 14C2.75 7.7868 7.7868 2.75 14 2.75C20.2132 2.75 25.25 7.7868 25.25 14Z" stroke="#fff" strokeWidth="1.5"></path><path d="M29.0001 29.5L21.5001 22" stroke="#fff" strokeWidth="1.5"></path></svg></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

