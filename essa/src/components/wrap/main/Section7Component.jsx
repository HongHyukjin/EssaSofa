import React from 'react';
import $ from 'jquery';
import TimerComponent from '../TimerComponent';
import {Link} from 'react-router-dom';

export default function Section7Component({쇼핑}) {
    

    const [state,setState] = React.useState({
        sec7Shop : [],
        n : 0
    })

    React.useEffect(() => {
        console.log(쇼핑)
        setState({
            ...state,
            sec7Shop : 쇼핑.slice(20,26),
            n : 쇼핑.slice(20,26).length
        })
    }, [쇼핑])


    React.useEffect(()=>{
        const $slideWrap = $('#section7 .slide-wrap');
        const $slideView = $('#section7 .slide-view');
        const $slideBack = $("#section7 .slide-wrap");
        let cnt = 0;


        // $slideView.css({width: `${418.719}px` });

        function mainSlide(){
            $slideView.stop().animate({left: `${-418.719*cnt}px`}, 1000, function(){
                // if(cnt === 1) cnt = 1;
                $slideView.stop().animate({left : `${-418.719 * cnt}px`},0);
            })
        }

        function nextCount(){
            cnt++;
            
            mainSlide();
        }

        function prevCount(){
            cnt--;
            
            mainSlide();
        }
        let touchStart = 0;
        let touchEnd = 0;
        let dragStart = 0;
        let dragEnd = 0;
        let mousedown = false;
        let $tagA = $('#section7 .slide .img-box')

        $slideView.on({
            mousedown(e){
                mousedown = true;
                touchStart = e.clientX;
                dragStart = e.clientX - $slideView.offset().left;

            // else if(move > 120 && move 320){
            //     cnt1= 1;
            // }

            },
            mouseup(e){        
                mousedown = false;
                touchEnd = e.clientX;
                let cnt1 =0;
                let move = Math.abs(touchEnd - touchStart);
                console.log(cnt);
                console.log(move);
                $tagA.css({"pointer-events":"auto"});
                 if($slideView.position().left>418.719){
                    $(this).stop().animate({left:0},100);

                }
                // else if($slideView.position().left>418.719){
                //     $(this).stop().animate({right:0},100);
                // }
                if(move > 120 && move < 400){
                    cnt1 =1;
                }
                else if(move >400 && move <950){
                    cnt1=2;
                }
                else if (move >950 && move <1500){
                    cnt1 =3;
                }
                console.log(cnt1);
                if((touchStart - touchEnd)>0){
                    if(!$slideView.is(':animated')){
                        for(let i=0; i<cnt1; i++){
                            nextCount();
                        }
                    }
                }

                if((touchStart-touchEnd) < 0){
                    if(!$slideView.is(':animated')){
                        for(let i=0; i<cnt1; i++){
                            prevCount();    
                        }
                    }
                }
            },
            mousemove(e){
                if(mousedown===false) return;
                if(dragEnd !== dragStart){
                    $tagA.css({"pointer-events":"none"});
                }
                dragEnd = e.clientX;
                if(!$slideView.is(':animated')){
                    $slideView.css({left:(dragEnd-dragStart-418.719)});
                }
            }
        })
        
    },[state.n])

    const setViewProduct = (value) =>{
        let arr = [];
        if(localStorage.getItem('최근본상품')!==null){
          arr = JSON.parse(localStorage.getItem('최근본상품'));
          arr = [value, ...arr]
          localStorage.setItem('최근본상품', JSON.stringify(arr) );  
        }
        else {
            arr = [value]
            localStorage.setItem('최근본상품', JSON.stringify(arr) );
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
        if(sessionStorage.getItem('user_id') === null){
          user_id = 'gurwlszx';
        }
        else{
          user_id = sessionStorage.getItem('user_id');
        }
        const formData = {
          "user_id" : user_id,
          "product_num" : item.제품코드,
          "amount" : 1
        }
    
        $.ajax({
          url : 'http://localhost:8080/JSP/essa/zzim_post_action.jsp',
          type : 'POST',
          data : formData,
          success(res){
              console.log('AJAX 성공!');
              console.log(res);
              console.log(JSON.parse(res));
              alert('상품이 찜 리스트에 담겼습니다!')
          },
          error(err){
            console.log('AJAX 실패!' + err);
          }
        })
    }

    const onMouseEnterShowBtnBox=(e)=>{
        e.preventDefault();
        $(e.target).next().animate({ opacity:1}, 200)
        $(e.target).next().css({transform : "translateY(0)"})
    }
    const onMouseLeaveHideBtnBox=(e)=>{
        e.preventDefault();
        $(e.target).next().animate({opacity:0},200)
        $(e.target).next().css({ transform : "translateY(200%"})
    }

    return (
        <div id='section7'>
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="timer">
                            <TimerComponent/>
                        </div>
                        <div className="slide-container">
                            <div className="slide-gap">
                            <ul className='slide-view'>
                                {
                                    state.sec7Shop.map((item,idx) => {
                                        return (
                                            <li className='slide-wrap'>
                                                <div className="slide">
                                                    <div onMouseEnter={onMouseEnterShowBtnBox} onMouseLeave={onMouseLeaveHideBtnBox} className="img-box">
                                                        <Link to={`/쇼핑/상세보기/${item.제품코드}`} onClick={(e) => onClickProduct(e, item)}>
                                                            <img src={`img/product/${item.이미지}`} alt="" />
                                                            <div className="button-box">
                                                                <div className="button">
                                                                    <button><img src="../img/section5/메인021.png" alt="" /></button>
                                                                    <button onClick={(e) => onClickZzim(e, item)}><img src="../img/section5/메인022.png" alt="" /></button>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="title-box">
                                                        <span className='name'>{item.제품명}</span>
                                                        <div className="title-under">
                                                            <span className='price'>{item.원가.toLocaleString('ko-KR')}원</span>
                                                            <span className='price2'>{item.할인가.toLocaleString('ko-KR')}원</span>
                                                            <span className='percent'>{item.할인율}%</span>
                                                        </div>
                                                        <img src="../img/section7/images026.png" alt="" />
                                                        <img src="../img/section7/images067.jpg" alt="" />
                                                        <a href="!#">
                                                            <span class="material-symbols-outlined"></span>
                                                            <i className='xi-comment-o'></i>
                                                            <span>{item.리뷰수}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                {/* {<li className='slide-wrap'>
                                    <div className="slide">
                                        <div  onMouseEnter={onMouseEnterShowBtnBox} onMouseLeave={onMouseLeaveHideBtnBox} className="img-box">
                                            <img src="../img/section7/images065.jpg" alt="" />
                                            <div className="button-box">
                                                <div className="button">
                                                    <button><img src="../img/section5/메인021.png" alt="" /></button>
                                                    <button><img src="../img/section5/메인022.png" alt="" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="title-box">
                                            <span className='name'>플로라 3인 카시미라 패브릭 소파</span>
                                            <div className="title-under">
                                                <span className='price'>2,293,000원</span>
                                                <span className='price2'>1,834,400원</span>
                                                <span className='percent'>20%</span>
                                            </div>
                                            <img src="../img/section7/images026.png" alt="" />
                                            <img src="../img/section7/images067.jpg" alt="" />
                                        </div>
                                    </div>
                                </li>} */}
                                {/* <li className='slide-wrap'>
                                    <div className="slide">
                                        <div  onMouseEnter={onMouseEnterShowBtnBox} onMouseLeave={onMouseLeaveHideBtnBox} className="img-box">
                                            <img src="../img/section7/images068.jpg" alt="" />
                                            <div className="button-box">
                                                <div className="button">
                                                    <button><img src="../img/section5/메인021.png" alt="" /></button>
                                                    <button><img src="../img/section5/메인022.png" alt="" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="title-box">
                                            <span className='name'>로제트 3인 리브 패브릭 소파</span>
                                            <div className="title-under">
                                                <span className='price'>1,890,000원</span>
                                                <span className='price2'>1,512,000원</span>
                                                <span className='percent'>20%</span>
                                            </div>
                                            <img src="../img/section7/images026.png" alt="" />
                                            <img src="../img/section7/images067.jpg" alt="" />
                                        </div>
                                    </div>
                                </li>
                                <li className='slide-wrap'>
                                    <div className="slide">
                                        <div  onMouseEnter={onMouseEnterShowBtnBox} onMouseLeave={onMouseLeaveHideBtnBox} className="img-box">
                                            <img src="../img/section7/images069.jpg" alt="" />
                                            <div className="button-box">
                                                <div className="button">
                                                    <button><img src="../img/section5/메인021.png" alt="" /></button>
                                                    <button><img src="../img/section5/메인022.png" alt="" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="title-box">
                                            <span className='name'>넬 와이드 3인 르브와 패브릭 소파</span>
                                            <div className="title-under">
                                                <span className='price'>1,740,000원</span>
                                                <span className='price2'>1,392,000원</span>
                                                <span className='percent'>20%</span>
                                            </div>
                                            <img src="../img/section7/images026.png" alt="" />
                                            <img src="../img/section7/images067.jpg" alt="" />
                                        </div>
                                    </div>
                                </li>
                                <li className='slide-wrap'>
                                    <div className="slide">
                                        <div  onMouseEnter={onMouseEnterShowBtnBox} onMouseLeave={onMouseLeaveHideBtnBox} className="img-box">
                                            <img src="../img/section7/images070.jpg" alt="" />
                                            <div className="button-box">
                                                <div className="button">
                                                    <button><img src="../img/section5/메인021.png" alt="" /></button>
                                                    <button><img src="../img/section5/메인022.png" alt="" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="title-box">
                                            <span className='name'>에또르 4인 오픈카우치형 리브 패브릭 소파</span>
                                            <div className="title-under">
                                                <span className='price'>2,500,000원</span>
                                                <span className='price2'>2,000,000원</span>
                                                <span className='percent'>20%</span>
                                            </div>
                                            <img src="../img/section7/images026.png" alt="" />
                                            <img src="../img/section7/images067.jpg" alt="" />
                                        </div>
                                    </div>
                                </li>
                                <li className='slide-wrap'>
                                    <div className="slide">
                                        <div  onMouseEnter={onMouseEnterShowBtnBox} onMouseLeave={onMouseLeaveHideBtnBox} className="img-box">
                                            <img src="../img/section7/images071.jpg" alt="" />
                                            <div className="button-box">
                                                <div className="button">
                                                    <button><img src="../img/section5/메인021.png" alt="" /></button>
                                                    <button><img src="../img/section5/메인022.png" alt="" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="title-box">
                                            <span className='name'>볼라레 1인 카시미라 패브릭 체어</span>
                                            <div className="title-under">
                                                <span className='price'>680,000원</span>
                                                <span className='price2'>544,000원</span>
                                                <span className='percent'>20%</span>
                                            </div>
                                            <img src="../img/section7/images026.png" alt="" />
                                            <img src="../img/section7/images067.jpg" alt="" />
                                        </div>
                                    </div>
                                </li>
                                <li className='slide-wrap'>
                                    <div className="slide">
                                        <div  onMouseEnter={onMouseEnterShowBtnBox} onMouseLeave={onMouseLeaveHideBtnBox} className="img-box">
                                            <img src="../img/section7/images065.jpg" alt="" />
                                            <div className="button-box">
                                                <div className="button">
                                                    <button><img src="../img/section5/메인021.png" alt="" /></button>
                                                    <button><img src="../img/section5/메인022.png" alt="" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="title-box">
                                            <span className='name'>롤리폴리 카시미라 패브릭 쿠션</span>
                                            <div className="title-under">
                                                <span className='price'>138,000원</span>
                                                <span className='price2'>110,400원</span>
                                                <span className='percent'>20%</span>
                                            </div>
                                            <img src="../img/section7/images026.png" alt="" />
                                            <img src="../img/section7/images067.jpg" alt="" />
                                        </div>
                                    </div>
                                </li> */}
                            </ul>
                            </div>
                            
                        </div>
                        <div className="scroll-bar"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
