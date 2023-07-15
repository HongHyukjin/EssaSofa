import React from 'react';
import $ from 'jquery';
import axios from 'axios';

function LovepetComponent(props) {

    const [state, setState] = React.useState({
        러브펫 : []
    });

    const getProduct=()=>{
        axios({
            url : './data/lovepet.json',
            method : 'GET'
        })
        .then((res)=>{
            setState({
                ...state,
                러브펫 : res.data.러브펫
            })
        })
        .catch((err)=>{
            console.log("axios오류" + err)
        })
    }

    React.useEffect(()=>{
        getProduct();
    },[]);

    return (
        <div id='lovepet'>
            <div id="lovepetsec1">
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="lovepetsec2">
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="lovepetsec3">
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <ul>
                                <li><img src="../img/subpage/lovepet/pet.gif" alt="" /></li>
                                <li><img src="../img/subpage/lovepet/sect3_cont.jpg" alt="" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="lovepetsec4">
                <div className="container">
                    <div className="gap">
                        <div className="content">
                            <img src="../img/subpage/lovepet/sect4_cont.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="lovepetsec5">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <div className="title-box">
                                <h1>우리집 멍멍이도 사주라개!</h1>
                                <span>LOVE PET goods</span>
                            </div>
                        </div>
                        <div className="product_list">
                            <ul>
                                {
                                    state.러브펫.map((item, idx) => {
                                       
                                            return (
                                                <li>
                                                    <div className="item_cont">
                                                        <div className="photo_box">
                                                            <a href="!#">
                                                                <img src={`../img/subpage/lovepet/${item.이미지}`} alt="" />
                                                                <div className="item_link">
                                                                    <div className="inner">
                                                                        <button type='button'>
                                                                            <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/data/skin/front/essa2023/img/mimg/cart_thumb.png" alt="" />
                                                                        </button>
                                                                        <button type='button' className='right'>
                                                                            <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/data/skin/front/essa2023/img/mimg/wish_thumb.png" alt="" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div className="info_box">
                                                            <div className="tit_box">
                                                                <a href="!#">
                                                                    <strong className='item_name'>{item.제품명}</strong>
                                                                    <span className='item_name_explain'>{item.제품설명}</span>
                                                                </a>
                                                            </div>
                                                            <div className="money_box">
                                                                <span className={`origin_price ${item.할인율 === '' ? 'on' : ''}`}>{item.
                                                                
                                                                
                                                                원가}</span>
                                                                <span className='sale_price'>{item.할인가}</span>
                                                                <span className='sale_per'>{item.할인율}</span>
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
            <div id="lovepetsec6">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <div className="sec9-tit-box">
                                <h1>Live Event</h1>
                                <span>MD가 챙겨주는 지금 HOT 인기 이벤트</span>
                            </div>
                        </div>
                        <div className="content">
                            <ul>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/bn_list.jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>ESSA 상반기 결산 이벤트</h3>
                                            <span className='event-date'>2023.06.20 ~ 07.16</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/bn_list2.jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>펫라인 런칭 10% OFF 프로모션</h3>
                                            <span className='event-date'>2023.06.13 ~ 07.16</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/bn_list3.jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>NEW CF 런칭 프로모션</h3>
                                            <span className='event-date'>2023.06.01 ~ 06.30</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/bn_list4.jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>온/오프라인 통합 플리마켓</h3>
                                            <span className='event-date'>재고 소진시 마감</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/8.jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>놓치면 잠못자요! 한정기간 짜릿한 할인</h3>
                                            <span className='event-date'>매주 업데이트</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/9.jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>공식물 멤버쉽 할인쿠폰</h3>
                                            <span className='event-date'>상시진행</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/10.jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>공식물 전용관</h3>
                                            <span className='event-date'>상시진행</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/11.jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>포토리뷰 이벤트</h3>
                                            <span className='event-date'>상시진행</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="event-box">
                                        <div className="img-box">
                                            <img src="../img/subpage/upgrade/bn_list (1).jpg" alt="" />
                                        </div>
                                        <div className="event-titbox">
                                            <h3>☁구름 착석감 업그레이드☁</h3>
                                            <span className='event-date'>2023.05.02 ~ 06.30</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LovepetComponent;