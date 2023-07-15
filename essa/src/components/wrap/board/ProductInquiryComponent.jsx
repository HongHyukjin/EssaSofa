import React from 'react';
import './board_scss/product_inquiry.scss';
import { Link } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

export default function ProductInquiryComponent (props){
  
  
    const [inquiry, setInquiry] = React.useState([]);
    const [key,setKey] =React.useState({
        key:'COMMUNITY',
        list :[]
    });
      
    const setList=(value)=>{
        let arr=[];
        if(localStorage.getItem('COMMUNITY')!==null){
            arr=JSON.parse(localStorage.getItem('COMMUNITY'));
            arr=[value, ...arr]
            localStorage.setItem('COMMUNITY',JSON.stringify(arr));
            setKey({
                ...key,
                list:arr
            })
        }
        else{
            arr=[value]
            localStorage.setItem('COMMUNITY',JSON.stringify(arr));
            setKey({
                ...key,
                list:arr
            })
        }
    }

    const onClickList=(e, item)=>{
       
        let obj ={
            idx:item.idx,
            user_id:item.user_id,
            user_name:item.user_name,
            subject:item.subject,
            content:item.content,
            category:item.category,
            write_date:item.write_date,
        }
        console.log(obj);   
        setList(obj);
            

    }

    const getlist = async () => {
      $.ajax({
        url:'http://localhost:8080/JSP/essa/product_inquiry_selectall.jsp',
        type:'GET',
        dataType:'JSON',
        success(res){
            console.log('AJAX 성공')
            console.log(res.result)
            setInquiry(res.result)
            window.location.href='#/상품문의글목록'
        },
        error(err){
            console.log('AJAX 실패'+ err);
        }
      })
    };
  
    React.useEffect(() => {
        window.scrollTo(0,0);
        getlist();
    }, []);

    return (
        <>
            <HeaderComponent/>
                <div id='ProductInquiry'>
                    <div className="container">
                        <div className="title">
                            <h2>상품문의</h2>
                        </div>
                        <div className="content">
                            <div className="board_nav">
                                <ul>
                                    <li><Link to="/고객센터" className=''>공지사항</Link></li>
                                    <li><Link to="/상품문의글목록" className='on'>상품문의</Link></li>
                                    <li><a className='' href="!#">자주하는 질문</a></li>
                                    <li><a className='' href="!#">AS문의</a></li>
                                    <li><a className='' href="!#">케어서비스</a></li>
                                </ul>
                            </div>
                            <div className="board_zone_cont">
                                <div className="board_zone_list">
                                    <div className="date_check_box">
                                        <form action="">
                                            <h3>조회기간</h3>
                                            <div className="date_check_list">
                                                <button type='button'>오늘</button>
                                                <button type='button'>7일</button>
                                                <button type='button'>15일</button>
                                                <button type='button'>1개월</button>
                                                <button type='button'>3개월</button>
                                                <button type='button'>1년</button>
                                            </div>
                                            <div className="date_check_calendar">
                                                <input type="text" id="picker2" name="rangDate[]" className='anniversary js_datepicker'/> ~&nbsp; 
                                                <input type="text" name="rangDate[]" id=""className='anniversary js_datepicker' />
                                            </div>
                                            <div className="btn_date_check">
                                                <em>조회</em>
                                            </div>
                                        </form>
                                    </div>
                                
                                    <table className='board_list_table2'>
                                        <thead>
                                            <tr>
                                                <th>문의날짜</th>
                                                <th>카테고리</th>
                                                <th>제목</th>
                                                <th>작성자</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                inquiry.map((item,idx)=>{
                                                    return(
                                                <tr key={idx} onClick={(e)=>onClickList(e,item)} >
                                                    <td> {item.write_date} </td>
                                                    <td> {item.category}</td>
                                                    <td className='board_tit'>
                                                        <Link to={`/상품문의글내용/${item.idx}`}>
                                                            <strong>{item.subject}</strong>
                                                            <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/data/skin/front/essa2023/board/skin/qa/img/icon/icon_board_attach_file.png" alt="" />
                                                            <img src="https://cdn-pro-web-153-127.cdn-nhncommerce.com/jakomo2_godomall_com/data/skin/front/essa2023/board/skin/qa/img/icon/icon_board_new.png" alt="" />
                                                        </Link>     
                                                    </td>
                                                    <td> {item.user_id} </td>
                                                </tr>
                                                    )    
                                                })
                                            }
                                        </tbody>
                                        
                                    </table>
                                
                                </div>
                                <div className="btn_right_box">
                                    <button type='button' className='btn_write'>
                                        <Link to='/상품문의글작성'>1:1 문의하기</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <FooterComponent/>
        </>
    );
};
