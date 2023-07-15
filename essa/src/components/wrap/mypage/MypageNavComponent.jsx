import React from 'react';
import {Link} from 'react-router-dom';

export default function MypageNavComponent() {
  return (
    <div id='mypagenav'>
      <div className="left-box">
        <div className="sub-menu-box">
          <h2><Link to='/마이페이지'>마이페이지</Link></h2>
          <ul className='sub-menu-mypage'>
            <li className='sub-menu-tit'>
              쇼핑정보
              <ul className='sub-menu-detail'>
                <li className='detail-tit'>주문목록 / 배송조회</li>
                <li className='detail-tit'>취소 / 반품 /교환내역</li>
                <li className='detail-tit'>환불 / 입금내역</li>
                <li className='detail-tit'><Link to="/찜페이지">찜리스트</Link></li>
              </ul>
            </li>
            <li className='sub-menu-tit'>
              혜택관리
              <ul className='sub-menu-detail'>
                <li className='detail-tit'>쿠폰</li>
                <li className='detail-tit'>예치금</li>
                <li className='detail-tit'>마일리지</li>
              </ul>
            </li>
            <li className='sub-menu-tit'>
              고객센터
              <ul className='sub-menu-detail'>
                <li className='detail-tit'><Link to="/1대1문의">1:1 문의</Link></li>
              </ul>
            </li>
            <li className='sub-menu-tit'>
              회원정보
              <ul className='sub-menu-detail'>
                <li className='detail-tit'>회원정보 변경</li>
                <li className='detail-tit'>회원 탈퇴</li>
                <li className='detail-tit'>배송지 관리</li>
              </ul>
            </li>
            <li className='sub-menu-tit'>
              나의 상품문의
            </li>
            <li className='sub-menu-tit'>
              나의 플러스리뷰
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

