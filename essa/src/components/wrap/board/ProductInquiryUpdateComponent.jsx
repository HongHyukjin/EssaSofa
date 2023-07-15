import React from 'react';
import './board_scss/board_write_update.scss';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductInquiryUpdateComponent (){
    const { listNum } = useParams();
    const [list, setList] = React.useState({
        idx:'',
        category : '',
        user_id:'',
        user_name :'',
        subject: '',
        isSubjectError:false,
        content: '',
        write_date:''
    })
    const {view}=list;
    const [state, setState] = React.useState({
        idx:'',
        category : '',
        user_id:'',
        user_name :'',
        subject: '',
        isSubjectError:false,
        content: '',
        write_date:''
    })

    React.useEffect(()=>{
        window.scrollTo(0,0);
        if (localStorage.getItem('COMMUNITY') !== null) {
            let result = JSON.parse(localStorage.getItem('COMMUNITY'));
            setList({
                ...list,
                idx: result[0].idx,     
                category: result[0].category,     
                user_id: result[0].user_id,     
                user_name: result[0].user_name,     
                subject: result[0].subject,    
                content: result[0].content,     
                write_date: result[0].location
            })
            console.log()
        }
    },[])

    const getList=()=>{

        // let formData = new URLSearchParams();
        // formData.append("idx", list.idx);
        let formData = {
            "idx" : list.idx,
            "listNum" : listNum
        }
        $.ajax({
            url : 'http://localhost:8080/JSP/essa/product_getListUpdate.jsp',
            type : 'POST',
            data : formData,
            dataType : 'json',
            success(res){
                console.log('ajax 성공');
                console.log(res.result);
                //alert('리스트출력');
                setState({
                    ...state,
                    idx:res.result.idx,
                    category:res.result.category,
                    user_id:res.result.user_id,
                    user_name:res.result.user_name,
                    subject:res.result.subject,
                    content:res.result.content,
                    write_date:res.result.write_date
                })
            },
            error(err){
                console.log('ajax 실패');
                console.log(err);
            }
        })
    }

    React.useEffect(()=>{
        getList();
    },[list.idx])


    const onChangeCategory=(e)=>{
        const {value} = e.target;
        setState({
            ...state,
            category: value
        })
    }

    const onChangeUserName = (e) => {
        const {value} = e.target;
        setState({
            ...state,
            user_name: value
          
        })
    }
    
    const onChangeSubject=(e)=>{
        const {value} = e.target;
        setState({
            ...state,
            subject: value
        })
    }

    

    const onChangeContent=(e)=>{
        const {value} = e.target;
        setState({
            ...state,
            content: value
        })
    }

    const onClickUpdataSubmit =(e)=>{
        e.preventDefault();
        let formData = new URLSearchParams();
        formData.append("idx", list.idx);
        formData.append("category", state.category);
        formData.append("user_id", state.user_id);
        formData.append("user_name", state.user_name);
        formData.append("subject", state.subject);
        formData.append("content", state.content);
        formData.append("write_date", state.write_date);
        console.log(formData);
        axios({
            url:'http://localhost:8080/JSP/essa/product_update_action.jsp',
            method:'post',
            data: formData,
            // params:formData
        })
        .then((res)=>{
            console.log('axios 성공');
            console.log(res);
            alert('글 수정이 완료되었습니다:)');
            window.location.href='#/상품문의글목록'
        })
        .catch((err)=>{
            console.log('axios 실패'+err);
        })
        
    }


 
    return (
        <>
            <HeaderComponent/>
                <div id='BoardWriteUpdate'>
                    <div className="container">
                        <div className="title">
                            <h2>상품문의 수정</h2>
                        </div>
                        <div className="content">
                            <form action="" name='product_inquiry_update_form' id='productInquiryUpdateForm' /* onSubmit={onSubmitProductInquiryUpdate} */>
                                <div className="board_zone_write">
                                    <div className="board_write_box">
                                        <table className='board_write_table'>
                                            <tbody>
                                                <tr>
                                                    <th scope='row'>말머리</th>
                                                    <td>
                                                        <div className='category_select'>
                                                            <select name="category" id="category" onChange={onChangeCategory} value={state.category}>
                                                                <option value="문의내용">문의내용</option>
                                                                <option value="상품">상품</option>
                                                                <option value="배송">배송</option>
                                                                <option value="반품/환불">반품/환불</option>
                                                                <option value="기타">기타</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope='row'>작성자</th>
                                                    <td>
                                                        <input 
                                                            type="text" 
                                                            id='user_name'
                                                            name='user_name'
                                                            onChange={onChangeUserName}
                                                            value={state.user_name}
                                                            disabled={true}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope='row'>제목</th>
                                                    <td>
                                                        <input 
                                                            type="text" 
                                                            id='subject'
                                                            name='subject' 
                                                            onChange={onChangeSubject}
                                                            value={state.subject}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope='row'>본문</th>
                                                    <td className='write_editor'>
                                                    <textarea 
                                                            type="text" 
                                                            id='content'
                                                            name='content' 
                                                            onChange={onChangeContent}
                                                            value={state.content}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="btn_center_box">
                                        <button className='btn_before'><Link to="/상품문의글목록">이전</Link></button>
                                        <button className='btn_before' type='submit' onClick={onClickUpdataSubmit}><a href="!#" >저장</a> </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <FooterComponent/>
        </>
    );
};
