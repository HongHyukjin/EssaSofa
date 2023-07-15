import React from 'react';
import $ from 'jquery';

function Section10Component(props) {

    const [state, setState] =React.useState({
        cnt : 0
    });

    React.useEffect(()=>{
        const $slideWrap = $('#section10 .slide-wrap');
        const $slideView = $('#section10 .slide-view');
        let cnt = state.cnt;

        function mainSlide(){
            $slideWrap.stop().animate({left: `${-428 * cnt}px`}, 1000, function(){
                // if(cnt === 8) cnt = 7;
                // else if(cnt === -2) cnt =2;
                setState({
                    ...state,
                    cnt : cnt
                })
                $slideWrap.stop().animate({left: `${-428 *cnt}px`},0);
            })
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
        let touchStart =0;
        let touchEnd = 0;
        let dragStart = 0;
        let dragEnd = 0;
        let mousedown = false;
        let $tagA = $('#section10 .slide a')


        $slideView.on({
            mousedown(e){
                mousedown = true;
                touchStart = e.clientX;
                dragStart = e.clientX - $slideWrap.offset().left;
                // console.log(touchStart);
            },
            mouseup(e){
                mousedown = false;
                touchEnd = e.clientX;
                let cnt1 = 0;
                let move = Math.abs(touchEnd - touchStart);
                console.log(move)
                $tagA.css({"pointer-events":"auto"});
                if($slideWrap.position().left>0){
                    $slideWrap.stop().animate({left : this.style=`${0}px`});
                }
                if($slideWrap.position().left>`${1903}px`){
                    $slideWrap.stop().animate({left:this.style=-`${1903}px`});
                }    
                if (move > 0 && move < 620) {
                    cnt1 = 1;
                } 
                else if (move < 1050) {
                  cnt1 = 2;
                } 
                else if (move < 1480) {
                  cnt1 = 3;
                } 
                else if (move < 1850) {
                  cnt1 = 4;
                }
                console.log(cnt1);
                if((touchStart - touchEnd) > 0){
                    if(!$slideWrap.is(':animated')){
                        for(let i=0; i<cnt1; i++){
                            nextCount();
                        }
                    }
                }
                if((touchStart - touchEnd) < 0){
                    if(!$slideWrap.is(':animated')){
                        for(let i=0; i<cnt1; i++){
                            prevCount();
                        }
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
                    $slideWrap.css({left: (dragEnd - dragStart-200)});
                }
            }
        })
    })

    React.useEffect(()=>{
        // const $slide1 = $('#section10 .slide1');
        // const $img1 = $('#section10 .slide1 img');
        // const $article1 = $('#section10 .slide1. article');

        // $img1.css({filter : "brightness(70%)"});
        // $slide1.css({padding : "35px 0"})
        // $article1.css({opacity : 0})

        // if(state.cnt === -1 || state.cnt ===3){
        //     $slide1.css({padding : "20px 0"})
        //     $img1.css({filter : "brightness(100%)"});
        //     $article1.css({opacity : 1})
        // }
        // else if(state.cnt===0){
        //     $slide2.css({padding : "20px 0"})

        // }
    },[state.cnt])


    return (
        <div id='section10'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h1>Celebrity</h1>
                    </div>
                    <div className="content">
                        <div className="slide-container">
                            <div className="slide-view">
                                <ul className='slide-wrap'>
                                    <li className='slide slide1'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp02.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>모델 주우재의 디오마레 소파</span>
                                            <span className='tit'>#DIOMARE</span>
                                        </article>
                                    </li>
                                    <li className='slide slide2'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp11.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>방송인 이지혜의 태리 소파</span>
                                            <span className='tit'>#TAEREE</span>
                                        </article>
                                    </li>
                                    <li className='slide slide3'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp07.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>가수 백지영의 하노버 소파</span>
                                            <span className='tit'>#HANOVER</span>
                                        </article>
                                    </li>
                                    <li className='slide slide4'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp08.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>배우 박하나의 포르토 소파</span>
                                            <span className='tit'>#PORTO</span>
                                        </article>
                                    </li>
                                    <li className='slide slide5'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp03.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>가수 초아의 페이튼 소파</span>
                                            <span className='tit'>#PHAETON</span>
                                        </article>
                                    </li>
                                    <li className='slide slide6'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp10.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>방송인 현영의 하노버 소파</span>
                                            <span className='tit'>#HANOVER</span>
                                        </article>
                                    </li>
                                    <li className='slide slide7'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp12.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>배우 정시아의 레반트 소파</span>
                                            <span className='tit'>#LEVANT</span>
                                        </article>
                                    </li>
                                    <li className='slide slide8'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp06.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>배우 이세희의 아미르 소파</span>
                                            <span className='tit'>#AMIR</span>
                                        </article>
                                    </li>
                                    <li className='slide slide9'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp01.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>배우 장희령의 하바나 소파</span>
                                            <span className='tit'>#HAVANA</span>
                                        </article>
                                    </li>
                                    <li className='slide slide10'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp04.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>배우 임수향의 카리브 소파</span>
                                            <span className='tit'>#CARIBE</span>
                                        </article>
                                    </li>
                                    <li className='slide slide11'>
                                        <a href="!#">
                                            <img src="../img/section10/story_temp05.jpg" alt="" />
                                        </a>
                                        <article>
                                            <span className='cate'>배우 윤진이의 하바나 소파</span>
                                            <span className='tit'>#HAVANA</span>
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
}

export default Section10Component;