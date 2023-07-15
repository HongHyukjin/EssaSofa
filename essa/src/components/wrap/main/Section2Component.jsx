import React from 'react';
import $ from 'jquery';

export default function Section2Component () {

  const [state, setState] = React.useState({
    cnt : 0
  });

  React.useEffect(() => {
    const $slideWrap = $('#section2 .slide-wrap');
    const $slideView = $('#section2 .slide-view');
    let cnt = state.cnt;

    function mainSlide(){
      $slideWrap.stop().animate({left : `${-835.547 * cnt}px`}, 1000, function(){
        if(cnt === 3) cnt = -1;
        else if(cnt === -2) cnt = 2;
        setState({
          ...state,
          cnt : cnt
        })
        $slideWrap.stop().animate({left:`${-835.547 * cnt}px`},0);
      });
    }

    function nextCount(){
      cnt++;
      setState({
        ...state,
        cnt : cnt
      })
      mainSlide();
    }

    function prevCount(){
      cnt--;
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
    let $tagA = $('#section2 .slide a');

    $slideView.on({
      mousedown(e){
        mousedown = true;
        touchStart = e.clientX;
        dragStart = e.clientX - $slideWrap.offset().left;
        console.log(touchStart)
      },
      mouseup(e){
        mousedown = false;
        touchEnd = e.clientX;
        $tagA.css({"pointer-events":"auto"});
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
        if(dragEnd !== dragStart){
          $tagA.css({"pointer-events":"none"});
        }
        dragEnd = e.clientX;
        if(!$slideWrap.is(':animated')){
          $slideWrap.css({left : (306.1165 + 835.547*2 + dragEnd - dragStart)});
        }
      }
    })

  })

  React.useEffect(() => {
    const $slide1 = $('#section2 .slide1');
    const $slide2 = $('#section2 .slide2');
    const $slide3 = $('#section2 .slide3');
    const $slide4 = $('#section2 .slide4');
    const $img1 = $('#section2 .slide1 img');
    const $img2 = $('#section2 .slide2 img');
    const $img3 = $('#section2 .slide3 img');
    const $img4 = $('#section2 .slide4 img');
    const $article1 = $('#section2 .slide1 article');
    const $article2 = $('#section2 .slide2 article');
    const $article3 = $('#section2 .slide3 article');
    const $article4 = $('#section2 .slide4 article');

    $img1.css({filter : "brightness(70%)"});
    $img2.css({filter : "brightness(70%)"});
    $img3.css({filter : "brightness(70%)"});
    $img4.css({filter : "brightness(70%)"});
    $slide1.css({padding : "35px 0"})
    $slide2.css({padding : "35px 0"})
    $slide3.css({padding : "35px 0"})
    $slide4.css({padding : "35px 0"})
    $article1.css({opacity : 0})
    $article2.css({opacity : 0})
    $article3.css({opacity : 0})
    $article4.css({opacity : 0})

    if(state.cnt === -1 || state.cnt === 3){
      $slide1.css({ padding : "20px 0" })
      $img1.css({filter : "brightness(100%)"});
      $article1.css({opacity : 1})
    }
    else if(state.cnt === 0){
      $slide2.css({ padding : "20px 0" })
      $img2.css({filter : "brightness(100%)"});
      $article2.css({opacity : 1})
    }
    else if(state.cnt === 1){
      $slide3.css({ padding : "20px 0" })
      $img3.css({filter : "brightness(100%)"});
      $article3.css({opacity : 1})
    }
    else if(state.cnt === 2 || state.cnt === -2){
      $slide4.css({ padding : "20px 0" })
      $img4.css({filter : "brightness(100%)"});
      $article4.css({opacity : 1})
    }
  }, [state.cnt])

  return (
    <div id="section2">
      <div className="container">
        <div className="gap">
          <div className="title"></div>
          <div className="content">
            <div className="slide-container">
              <div className="slide-view">
                <ul className="slide-wrap">
                  <li className="slide slide3">
                    <a href="https://www.youtube.com/embed/fhzYv3NT4jc" draggable="false">
                      <img src="./img/main_vid1.jpg" alt="" />
                      <i></i>
                    </a>
                    <article>
                      <span className="cate">STORY</span>
                      <span className='tit'>공간디자이너의 공간은 어떤 모습?</span>
                    </article>
                  </li>
                  <li className="slide slide4">
                    <a href="" draggable="false">
                      <img src="./img/main_vid4.jpg" alt="" />
                      <i></i>
                    </a>
                    <article>
                      <span className="cate">COLLABO</span>
                      <span className='tit'>켈리박과 함께하는 달콤한 컬래버레이션</span>
                    </article>
                  </li>
                  <li className="slide slide1">
                    <a href="" draggable="false">
                      <img src="./img/main_vid2.jpg" alt="" />
                      <i></i>
                    </a>
                    <article>
                      <span className="cate">STORY</span>
                      <span className='tit'>지소연&송재희 부부의 홈 투어</span>
                    </article>
                  </li>
                  <li className="slide slide2">
                    <a href="https://youtu.be/qCuh1-1NVzM" draggable="false">
                      <img src="./img/main_vid6.jpg" alt="" />
                      <i></i>
                    </a>
                    <article>
                      <span className="cate">TV-CF</span>
                      <span className='tit'>2023 ESSA x 박서준 TV-CF</span>
                    </article>
                  </li>
                  <li className="slide slide3">
                    <a href="https://www.youtube.com/embed/fhzYv3NT4jc" draggable="false">
                      <img src="./img/main_vid1.jpg" alt="" />
                      <i></i>
                    </a>
                    <article>
                      <span className="cate">TV-CF</span>
                      <span className='tit'>공간디자이너의 공간은 어떤 모습?</span>
                    </article>
                  </li>
                  <li className="slide slide4">
                    <a href="" draggable="false">
                      <img src="./img/main_vid4.jpg" alt="" />
                      <i></i>
                    </a>
                    <article>
                      <span className="cate">COLLABO</span>
                      <span className='tit'>켈리박과 함께하는 달콤한 컬래버레이션</span>
                    </article>
                  </li>
                  <li className="slide slide1">
                    <a href="" draggable="false">
                      <img src="./img/main_vid2.jpg" alt="" />
                      <i></i>
                    </a>
                    <article>
                      <span className="cate">STORY</span>
                      <span className='tit'>지소연&송재희 부부의 홈 투어</span>
                    </article>
                  </li>
                  <li className="slide slide2">
                    <a href="https://youtu.be/qCuh1-1NVzM" draggable="false">
                      <img src="./img/main_vid6.jpg" alt="" />
                      <i></i>
                    </a>
                    <article>
                      <span className="cate">TV-CF</span>
                      <span className='tit'>2023 ESSA x 박서준 TV-CF</span>
                    </article>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

