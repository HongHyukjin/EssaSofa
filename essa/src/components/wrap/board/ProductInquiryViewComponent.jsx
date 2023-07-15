import React from 'react';
import './board_scss/product_inquiry_view.scss';
import { Link } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent'
import {useSearchParams} from 'react-router-dom';
import { json, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


export default function ProductInquiryViewComponent (props){

    const [param, setParam] = useSearchParams();
    const listNum = param.get('listNum');

    const [state, setState] = React.useState({
        notice: {}
    })
    
    const [data, setData] = useState({
        view:{},
        canUpdate : false
    });

    const {view,updata}=data;
    const {user_id} = useParams();
    

    React.useEffect(()=>{
        window.scrollTo(0,0);
        let view = [];
        let canUpdate = false;
        if (localStorage.getItem('COMMUNITY') !== null) {
            let result = JSON.parse(localStorage.getItem('COMMUNITY'));
            view = result[0];
            if(result[0].user_id === sessionStorage.getItem('user_id')){
                canUpdate = true;
            }
            setData({
                ...data,
                view: view,
                canUpdate : canUpdate
            })
            console.log(data.view)
        }
    },[]);

    const getList= async()=>{
        try {
            axios({
                url:'http://localhost:8080/JSP/essa/product_inquiry_selectall.jsp',
                method:'GET',  
                dataType:'json'
            })
            .then((res)=>{
                setState({
                    ...state,
                    listData:res.data.result
                    
                });
                console.log(res);  
            })
            .catch((err)=>{
                console.log(err);  

            })
    
        } catch (err) {
            console.log(err);   

        }
    }
    React.useEffect(()=>{
        console.log('!')
        window.scrollTo(0,0);
        getList();
    },[]);

    const onClickDelete=(e)=>{
        e.preventDefault();
        console.log(view.idx);
        let formData = new URLSearchParams();
        formData.append("idx", view.idx);
        axios({
          url: 'http://localhost:8080/JSP/essa/product_delete_action.jsp',
          method: 'POST',
          data: formData, // 수정: formData를 data 속성에 전달
          params: formData
        })
          .then((res) => {
            console.log('AJAX 성공');
            console.log(res);
            alert('삭제되었습니다');
            window.location.href = '#/상품문의글목록';
          })
          .catch((err) => {
            console.log('AJAX 실패' + err);
          });
    }


    return (
        <>
            <HeaderComponent/>
                <div id='productView'>
                    <div className="container" /* key={user_id} */>
                        <div className="title">
                            <h2>상품문의</h2>
                        </div>
                        <div className="content">
                            <div className="board-view-box">
                                <div className="board_view_tit">
                                    <h3>{view.category}{view.subject}</h3>
                                </div>
                                <div className="board_view_info">
                                    <ul>
                                        <li><p>{view.user_id}</p></li>
                                        <li><em>{view.write_date}</em></li>
                                        <li><p>조회수 158</p></li>
                                    </ul>
                                </div>
                                <div className="board_view_content">
                                    <div className="seem_cont">
                                        <ul>
                                            <li><b>Q.</b></li>
                                            <li><span>{view.content}</span></li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btn_right_box">
                            {
                                data.canUpdate && (
                                    <>
                                        <button><Link to='/상품문의글수정폼'>수정</Link> </button>
                                        <button onClick={onClickDelete}>삭제</button>
                                    </>
                                )
                            }
                            <button><Link to='/상품문의글목록'>목록</Link> </button>
                        </div>
                    </div>
                </div>
            <FooterComponent/>
        </>
    );
};

