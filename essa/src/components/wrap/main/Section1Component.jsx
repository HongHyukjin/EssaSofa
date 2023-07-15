import React from 'react';
import $ from 'jquery';

export default function Section1Component () {

  const [state, setState] = React.useState({
    cnt : 0
  });

  React.useEffect(() => {
    const $slideWrap = $('#section1 .slide-wrap');
    const $section1 = $('#section1');
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


    $section1.on({
      mousedown(e){
        mousedown = true;
        touchStart = e.clientX;
        console.log(touchStart)
        dragStart = e.clientX - $slideWrap.offset().left;
      },
      mouseup(e){
        mousedown = false;
        touchEnd = e.clientX;
        console.log(touchEnd)
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
        if(!$slideWrap.is(':animated') && 0<=cnt<=2){
          $slideWrap.css({left : (dragEnd - dragStart)});
        }
      }
    })

  })

  React.useEffect(() => {
    const $pagenation = $('#section1 .pagination-progressbar-fill');
    const $t01 = $('#section1 .t01');
    const $slide2t02 = $('#section1 .slide2 .t02');
    const $slide2t03 = $('#section1 .slide2 .t03');
    const $slide2more = $('#section1 .slide2 .more');
    const $slide3t02 = $('#section1 .slide3 .t02');
    const $slide3t03 = $('#section1 .slide3 .t03');
    const $slide3more = $('#section1 .slide3 .more');
    
    $t01.removeClass('on');
    $slide2t02.removeClass('on');
    $slide2t03.removeClass('on');
    $slide2more.removeClass('on');
    $slide3t02.removeClass('on');
    $slide3t03.removeClass('on');
    $slide3more.removeClass('on');

    if(state.cnt === 0){
      $t01.addClass('on');
    }
    else if(state.cnt === 1){
      $slide2t02.addClass('on');
      $slide2t03.addClass('on');
      $slide2more.addClass('on');
    }
    else{
      $slide3t02.addClass('on');
      $slide3t03.addClass('on');
      $slide3more.addClass('on');
    }
    $pagenation.css({width : `${(state.cnt+1)*33.33333}%`})
  }, [state.cnt])



  return (
    <div id="section1">
      <div className="container">
        <div className="gap">
          <div className="title"></div>
          <div className="content">
            <div className="slide-container">
              <div className="slide-view">
                <ul className='slide-wrap'>
                  <li className='slide slide1'>
                    <div className="text">
                      <p className='t01'>Premium Sofa Brand</p>
                      <div className="logo">
                        <img src="./img/essa.svg" alt="" />
                      </div>
                    </div>
                    <video muted="muted" autoplay="autoplay" loop playsinline>
                      <source src='https://essasvr.kr/video/live/cf2023.mp4' type='video/mp4' />
                    </video>
                  </li>
                  <li className='slide slide2'>
                    <div className="text">
                      <p className='t02'>Caribe</p>
                      <p className='t03'>최상의 착석감, 나만의 휴식처 카리브</p>
                      <a href="">
                        <div className="more">
                          <span>VIEW MORE 
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 16L14 12L10 8" stroke="#fff" stroke-width="1.33" stroke-linecap="square"></path>
                            </svg>
                          </span>
                        </div>
                      </a>
                    </div>
                  </li>
                  <li className='slide slide3'>
                    <div className="text">
                      <p className='t02'>Avenue</p>
                      <p className='t03'>품격있는 우아함의 완성, 에비뉴</p>
                      <a href="">
                        <div className="more">
                          <span>VIEW MORE
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 16L14 12L10 8" stroke="#fff" stroke-width="1.33" stroke-linecap="square"></path>
                            </svg>
                          </span>
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pagination-progressbar">
              <span className="pagination-progressbar-fill" ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

