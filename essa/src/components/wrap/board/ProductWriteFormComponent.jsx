import React from 'react';
import './board_scss/board_write.scss';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';

export default function ProductWriteFormComponent (props){
    const [state, setState] = React.useState({
        category : '',
        user_name :'',
        subject: '',
        isSubjectError:false,
        content: ''
    })

    const onChangeCategory=(e)=>{
        let 카테고리 = e.target.value;
        setState({
            ...state,
            category: 카테고리
        })
    }

    const onChangeUserName = (e) => {
        let 이름 = e.target.value;
        setState({
            ...state,
            user_name:이름
          
        })
    }
    
    const onChangeSubject=(e)=>{
        let 제목= e.target.value;
        setState({
            ...state,
            subject:제목
        })
    }

    
    React.useEffect(()=>{
        let num=state.subject.length;
        setState({
            ...state,
            num:num
        })
    },[state.subject]);

    const onChangeContent=(e)=>{
        let 내용 = e.target.value;
        setState({
            ...state,
            content:내용
        })
    }

    const onClickSubmit=(e)=>{
        e.preventDefault();
        console.log('클릭');
        onSubmitProductInquiry();
    
    }
   
    const onSubmitProductInquiry=()=>{
        const formData = {
            "user_id":sessionStorage.getItem("user_id"),
            "category":state.category,
            "user_name":state.user_name,
            "subject":state.subject,
            "content":state.content
        }
        console.log(formData);
        $.ajax({
            url:'http://localhost:8080/JSP/essa/product_inquiry_action.jsp',
            type:'post',
            data:formData,
            success(res){
                console.log('AJAX 성공');
                console.log(res);
                if( !state.category || !state.user_name || !state.subject || !state.content){
                    alert('모든 항목을 입력해주세요!');
                }
                else {
                    window.location.href = '#/상품문의글목록';
                }
            },
            error(err){
                console.log('AJAX 실패'+err);
            }
        })
    }

    React.useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return (
        <>
            <HeaderComponent/>
                <div id='BoardWrite'>
                    <div className="container">
                        <div className="title">
                            <h2>상품문의</h2>
                        </div>
                        <div className="content">
                            <form action="" name='product_inquiry' id='productInquiry' onSubmit={onSubmitProductInquiry}>
                                <div className="board_zone_write">
                                    <div className="board_write_box">
                                        <table className='board_write_table'>
                                            <tbody>
                                                <tr>
                                                    <th scope='row'>말머리</th>
                                                    <td>
                                                        <div className='category_select'>
                                                            <select name="category" id="category" onChange={onChangeCategory}>
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
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="btn_center_box">
                                        <button className='btn_before'><Link to="/상품문의글목록">이전</Link></button>
                                        <button className='btn_before' onClick={onClickSubmit}><Link to="/상품문의글목록">저장</Link> </button>
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
