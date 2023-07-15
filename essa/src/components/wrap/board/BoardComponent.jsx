import React from 'react';
import { useState, useEffect } from 'react';
import './board_scss/board.scss'
import { Link } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import axios from 'axios';

export default function BoardComponent(props){

    const [notice, setNotice] = React.useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    React.useEffect(() => {
        window.scrollTo(0,0);
        axios({
            url: './data/notice_page/board.json',
            method:'GET'
        })
          .then((res) => {
            if (res.status === 200) {
              setNotice(res.data.notice);
            }
          })
          .catch((err) => {
            console.log(err+"AXIOS 오류!");
          });
      }, []);

        // 페이지별로 공지사항 데이터를 분할하는 함수
        const getPaginatedData = () => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return notice.slice(startIndex, endIndex);
        };

        // 페이지 변경 시 호출되는 함수
        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        };

    return (
        <>
        <HeaderComponent/>
            <div id='Board'>
                <div className="container">
                    <div className="title">
                        <h2>공지사항</h2>
                    </div>
                    <div className="content">
                        <div className="board_nav">
                            <ul>
                                <li><Link to="/고객센터" className='on' >공지사항</Link></li>
                                <li><Link to="/상품문의글목록"  className='' >상품문의</Link></li>
                                <li><a className='' href="!#">자주하는 질문</a></li>
                                <li><a className='' href="!#">AS문의</a></li>
                                <li><a className='' href="!#">케어서비스</a></li>
                            </ul>
                        </div>
                        <div className="board_zone_cont">
                            <div className="board_zone_list" align="center">
                                <table className='board_list_table'>
                                    <colgroup>
                                        <col Style ="width:6%"/>
                                        <col Style ="width:37%"/>
                                        <col Style ="width:7%"/>
                                        <col Style ="width:6%"/>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>제목</th>
                                            <th>날짜</th>
                                            <th>조회수</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {getPaginatedData().map((item) => (
                                    <tr key={item.NO}>
                                      <td>{item.NO}</td>
                                      <td className="board_tit">
                                        <Link to={`/공지사항글내용/?listNum=${item.NO}`}>
                                          <strong>{item.제목}</strong>
                                        </Link>
                                      </td>
                                      <td>{item.날짜}</td>
                                      <td>{item.조회수}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                        </div>
                        <div className="pagination">
                            <div className="page-button-box">
                              {Array.from({ length: Math.ceil(notice.length / itemsPerPage) }).map((_, index) => (
                                <button
                                  key={index + 1}
                                  className={currentPage === index + 1 ? 'active' : ''}
                                  onClick={() => handlePageChange(index + 1)}
                                >
                                  {index + 1}
                                </button>
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <FooterComponent/>
        </>
    );
};

