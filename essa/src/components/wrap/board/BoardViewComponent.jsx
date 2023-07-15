import React from 'react';
import { Link } from 'react-router-dom';
import FooterComponent from '../FooterComponent';
import HeaderComponent from '../HeaderComponent';
import './board_scss/board_view.scss';
// 쿼리 스트링 => 키(listNum)와 키값(item.NO)
// 파라미터 => 보내온 파라미터 데이터를 추출(검색)
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';

export default function BoardViewComponent (props){

    const [param, setParam] = useSearchParams();
    const listNum = param.get('listNum');

    const [state, setState] = React.useState({
        notice: {}
    })
    
    const {notice} = state;

    React.useEffect(()=>{
        window.scrollTo(0,0);
        axios({
            url:'./data/notice_page/board.json',
            method:'GET',
        })
        .then((res)=>{
            if(res.status===200){
                // console.log(res.data.notice);
                let result = res.data.notice.filter((item) => item.NO===Number(listNum));
                console.log(result);

                setState({
                    notice: result[0]
                })
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패!' + err);
        })
    },[]);

     // 글목록으로 이동
     const onClickNoticeList=(e)=>{
        e.preventDefault();
        window.location.pathname = '/고객센터';
    }

    // 글삭제
    const onClickDelete=(e)=>{
        e.preventDefault();
        alert('공지사항 글을 삭제 하시겠습니까?');        
    }

    // 글수정
    const onClickUpdate=(e)=>{
        e.preventDefault();
        // 수정페이지로 이동
        window.location.pathname = '/상품문의글수정';
    }


    return (
        <>
            <HeaderComponent/>
                <div id='boardView'>
                    <div className="container">
                        <div className="title">
                            <h2>공지사항</h2>
                        </div>
                        <div className="content">
                            <div className="board-view-box">
                                <div className="board_view_tit">
                                    <h3>{notice.제목}</h3>
                                </div>
                                <div className="board_view_info">
                                    <ul>
                                        <li><em>{notice.날짜}</em></li>
                                        <li><p>{notice.조회수}</p></li>
                                    </ul>
                                </div>
                                <div className="board_view_content">
                                    <div className="seem_cont">
                                        <ul>
                                            <li>
                                                <p dangerouslySetInnerHTML={{ __html: (notice && notice.내용) ? notice.내용.replace(/\n/g, '<br>') : '' }}></p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_right_box">
                            <button onClick={onClickUpdate}><Link to="/고객센터">수정</Link></button>
                            <button onClick={onClickDelete}><Link to="/고객센터">삭제</Link></button>
                            <button onClick={onClickNoticeList}><Link to="/고객센터">목록</Link></button>
                        </div>
                    </div>
                </div>
            <FooterComponent/>
        </>
    );
};

