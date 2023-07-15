import React from 'react';

export default function Section11Component () {

    return (
        <div id="section11">
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2 className='main-title'>Collaboration</h2>
                    </div>
                    <div className="content">
                        <div className="left-box">
                            <div className="video-wrap">
                                
                                <video muted="muted" autoplay="autoplay" loop playsinline>
                                    <source src="https://essasvr.kr/video/live/kellypark.webm" type="video/webm"/>
                                    <source src="https://essasvr.kr/video/live/kellypark.mp4" type="video/mp4"/>
                                </video>
                            </div>
                        </div>
                        <div className="right-box">
                        <div className="right-content">
                                <ul>
                                    <li>
                                        <div  className="img-box" >
                                            <img src="./img/section11/1.jpg" alt="" />
                                        </div>
                                        <div className="title-box">
                                            <span>에클레어 3.5인 카시미라 패브릭 소파</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div  className="img-box" >
                                            <img src="./img/section11/2.jpg" alt="" />
                                        </div>
                                        <div className="title-box">
                                            <span>켈리박 스웻하트 쿠션</span>
                                            
                                        </div>
                                    </li>
                                    <li>
                                        <div  className="img-box" >
                                            <img src="./img/section11/3.jpg" alt="" />
                                        </div>
                                        <div className="title-box">
                                            <span>켈리박 러브/와우 쿠션</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div  className="img-box" >
                                            <img src="./img/section11/4.jpg" alt="" />
                                        </div>
                                        <div className="title-box">
                                            <span>켈리박 멜팅 패브릭 스툴</span>
                                        </div>
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

