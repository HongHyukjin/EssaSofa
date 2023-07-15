import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

export default function Section3Component () {

  const [state, setState] = React.useState({
    cnt : 0
  });

  React.useEffect(() => {
    const $slideWrap = $('#section3 .slide-wrap');
    const $section3 = $('#section3 .container');
    const $slide = $('#section3 .slide');
    let cnt = state.cnt;

    function mainSlide(){
      $slideWrap.stop().animate({left : `${-100 * cnt}%`}, 1000, function(){
        $slideWrap.stop().animate({left:`${-100*cnt}%`},0);
      });
    }

    function nextCount(){
      cnt++;
      if(cnt > 2){
        cnt = 2;
      }
      setState({
        ...state,
        cnt : cnt
      })
      mainSlide();
    }

    function prevCount(){
      cnt--;
      if(cnt < 0){
        cnt = 0;
      }
      setState({
        ...state,
        cnt : cnt
      })
      mainSlide();
    }

    let touchStart = 0;
    let touchEnd = 0;
    let dragStart = 0;
    let dragEnd = 0;
    let mousedown = false;


    $section3.on({
      mousedown(e){
        mousedown = true;
        touchStart = e.clientX;
        dragStart = e.clientX - $slideWrap.offset().left;
      },
      mouseup(e){
        mousedown = false;
        touchEnd = e.clientX;
        $slide.css({"pointer-events":"auto"});
        // 오른쪽으로 드래그
        if((touchStart - touchEnd) > 0){
          if(!$slideWrap.is(':animated')){
            nextCount();
          }
        }
        if((touchStart - touchEnd) < 0){
          if(!$slideWrap.is(':animated')){
            prevCount();
          }
        }
      },
      mousemove(e){
        if(mousedown === false) return;
        dragEnd = e.clientX;
        $slide.css({"pointer-events":"none"});
        if(!$slideWrap.is(':animated') && 0<=cnt<=2){
          $slideWrap.css({left : (-227.615 + dragEnd - dragStart)});
        }
      }
    })

    const $top = $('#section3 .top');
    const $nth1 = $('#section3 .bottom ul li:nth-child(1)');
    const $nth2 = $('#section3 .bottom ul li:nth-child(2)');
    const $nth3 = $('#section3 .bottom ul li:nth-child(3)');
    const $nth4 = $('#section3 .bottom ul li:nth-child(4)');

    $(window).scroll(function(e){
      // console.log($(window).scrollTop());
      if($(window).scrollTop() > 800){
        $top.css({animation: "top_ani 1s forwards"})
      }
      if($(window).scrollTop() > 900){
        $nth1.css({animation: "bottom_ani 1s 0.1s forwards"})
        $nth2.css({animation: "bottom_ani 1s 0.4s forwards"})
        $nth3.css({animation: "bottom_ani 1s 0.7s forwards"})
        $nth4.css({animation: "bottom_ani 1s 1s forwards"})
      }
      
    })

  })

  React.useEffect(() => {
    const $pagenation = $('#section3 .pagenation-bullet');
    console.log("!")
    $pagenation.removeClass('on');
    // $pagenation.css({width : "20px"})
    // console.log($pagenation.eq(state.cnt))
    $pagenation.eq(state.cnt).addClass('on');
  }, [state.cnt])

  const onClickSlide1 = (e) => {
    window.location.href='/main/html.php?htmid=proc/guide/benefit.html';
  }

  const onClickSlide2 = (e) => {
    window.location.href='/main/html.php?htmid=proc/event/jsm/essamall_benefit.html';
  }

  const onClickSlide3 = (e) => {
    window.open('https://shcard.io/ESSA');
  }


  return (
    <div id="section3">
      <div className="container">
        <div className="gap">
          <div className="title"></div>
          <div className="content">
            <div className="top">
              <div className="slide-container">
                <div className="slide-view">
                  <ul className="slide-wrap">
                    <li className="slide slide1" onClick={onClickSlide1}>
                      <a href="">BENEFIT GUIDE</a>
                      <p>공식몰 최대 9% 할인 쿠폰</p>
                      <img src="./img/benefit_bn_ico1.png" alt="" />
                    </li>
                    <li className="slide slide2" onClick={onClickSlide2}>
                      <a href="">Shall we ESSA?</a>
                      <p>신혼·신규입주·추천 인증하고, 18만원 쿠폰팩 받기</p>
                      <img src="./img/benefit_bn_ico2.png" alt="" />
                    </li>
                    <li className="slide slide3" onClick={onClickSlide3}>
                      <a href="">ShinhanCard</a>
                      <p>이벤트 신청하고 1.5% 캐시백 받기!</p>
                      <img src="./img/benefit_bn_ico3.png" alt="" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pagenation">
                <span className='pagenation-bullet on'></span>
                <span className='pagenation-bullet'></span>
                <span className='pagenation-bullet'></span>
              </div>
            </div>
            <div className="bottom">
              <ul>
                <li>
                  <Link to='/클럽페이지'>
                    <span className='round on'>
                      <img src="./img/point_thumb6.png" alt="" />
                    </span>
                  </Link>
                  <span className='tit'>ESSA CLUB</span>
                </li>
                <li>
                  <Link to='/업그레이드페이지'>
                    <span className='round'>
                      <img src="./img/point_thumb1.png" alt="" />
                    </span>
                  </Link>
                  <span className='tit'>착석감 UPGRADE</span>
                </li>
                <li>
                  <Link to='/러브펫페이지'>
                    <span className='round on'>
                      <img src="./img/point_thumb2.png" alt="" />
                    </span>
                  </Link>
                  <span className='tit'>LOVE PET</span>
                </li>
                <li>
                  <Link to='/인하우스페이지'>
                    <span className='round'>
                      <img src="./img/point_thumb3.png" alt="" />
                    </span>
                  </Link>
                  <span className='tit'>에싸 in 집</span>
                </li>
                <li>
                  <a href="!#">
                    <span className='round'>
                      <img src="./img/point_thumb4.png" alt="" />
                    </span>
                  </a>
                  <span className='tit'>REFURB MARKET</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

