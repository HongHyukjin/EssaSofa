import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

export default function Section6Component({쇼핑}){

    const [state,setState] = React.useState({
        sec6Shop : []
    })

    React.useEffect(() => {
        console.log(쇼핑)
        setState({
            ...state,
            sec6Shop : 쇼핑.slice(8,14)
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
    return (
        <div id='section6'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2 className='main-title'>MD's Pick</h2>
                    </div>
                    <div className="content">
                        <div className="left-box">
                            <div className="video-wrap">
                                <video muted="muted" autoplay="autoplay" loop playsinline>
                                    {/* <source src='https://essasvr.kr/video/live/lieb_beer.webm' type="video/webm"/> */}
                                    <source src='https://essasvr.kr/video/live/lieb_beer.mp4' type="video/mp4"/>
                                </video>
                                <div className="inner-wrap">
                                    <p>PREMIUM ESSA LIFE</p>
                                    <p>이런소파 어때요?</p>
                                </div>
                            </div>
                        </div>
                        <div className="right-box">
                            <ul>
                                {
                                    state.sec6Shop.map((item,idx) => {
                                        return (
                                            <li>
                                                <div className="item_cont">
                                                    <div onMouseEnter={onMouseEnterShowBtnBox} onMouseLeave={onMouseLeaveHideBtnBox} className="item_photo_box">
                                                        <Link to={`/쇼핑/상세보기/${item.제품코드}`} onClick={(e) => onClickProduct(e, item)}>
                                                            <img src={`img/product/${item.이미지}`} alt="" />
                                                            <div className="button-box">
                                                                <div className="button">
                                                                    <button><img src="./img/product_01.png" alt="" /></button>
                                                                    <button><img src="./img/product_02.png" alt="" /></button>
                                                                </div>
                                                            </div>
                                                        </Link>

                                                    </div>
                                                    <div className="item_info_cont">
                                                        <div className="item_tit_box">
                                                            <strong className='item_name'>{item.제품명}</strong>

                                                        </div>
                                                        <div className="item_money_box">
                                                            <strong className='item_sale'>{item.원가.toLocaleString('ko-KR')}원</strong>
                                                            <strong className='m_price'>{item.할인가.toLocaleString('ko-KR')}원</strong>
                                                            <span className='sale_per'>{item.할인율}%</span>
                                                        </div>
                                                        <div className="item_icon_box">
                                                            <img src="./img/i_coupon.jpg" alt="" />
                                                            <img src="./img/gickyoung.png" alt="" />
                                                        </div>
                                                        <div className="item_review_cnt">
                                                            <ul>
                                                                <li>
                                                                    <a href="!#">
                                                                        <span class="material-symbols-outlined"></span>
                                                                        <i className='xi-comment-o'></i>
                                                                        <span>{item.리뷰수}</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
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
        </div>
    );
};

