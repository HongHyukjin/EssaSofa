import React from 'react';
import SigninComponent from './wrap/memberPage/SigninComponent';
import SignupComponent from './wrap/memberPage/SignupComponent';
import IntroComponent from './wrap/IntroComponent';
import NomemberComponent from './wrap/memberPage/NomemberComponent';
import { HashRouter, Routes , Route} from 'react-router-dom';
import EssaClubComponent from './wrap/subPage/EssaClubComponent';
import ProductComponent from './wrap/ProductComponent';
import ProductDetailComponent from './wrap/ProductDetailComponent';
import MypageComponent from './wrap/mypage/MypageComponent';
import ZzimComponent from './wrap/mypage/ZzimComponent';
import BoardComponent from './wrap/board/BoardComponent';
import ProductInquiryComponent from './wrap/board/ProductInquiryComponent.jsx';
import ProductWriteFormComponent from './wrap/board/ProductWriteFormComponent';
import BoardViewComponent from './wrap/board/BoardViewComponent';
import ProductInquiryViewComponent from './wrap/board/ProductInquiryViewComponent';
import ProductInquiryUpdateComponent from './wrap/board/ProductInquiryUpdateComponent';
import BasketComponent from './wrap/mypage/BasketComponent';
import UpdateComponent from './wrap/mypage/UpdateComponent';
import IdSearchComponent from './wrap/memberPage/IdSearchComponent'
import PwSearchComponent from './wrap/memberPage/PwSearchComponent';
import MyProductInquiryComponent from './wrap/mypage/MyProductInquiryComponent';

export default function WrapComponent ()  {
    return (
        <div id='wrap'>
            <HashRouter>
                <Routes>
                    <Route path='/*' element={<IntroComponent/>}/>
                    <Route path='/로그인' element={<SigninComponent/>}/>
                    <Route path='/회원가입' element={<SignupComponent/>}/>
                    <Route path='/로그인/비회원페이지' element={<NomemberComponent/>}/>
                    <Route path='/쇼핑' element={<ProductComponent />}/>
                    <Route path='/상세보기' element={<ProductDetailComponent />}/>
                    <Route path='/마이페이지' element={<MypageComponent/>}/>
                    <Route path='/1대1문의' element={<MyProductInquiryComponent />}/>
                    <Route path='/찜페이지' element={<ZzimComponent/>}/>
                    <Route path='/쇼핑' element={<ProductComponent />}/>
                    <Route path='/쇼핑/상세보기/:id' element={<ProductDetailComponent />}/>
                    <Route path='/고객센터' element={<BoardComponent/>}/>
                    <Route path='/공지사항글내용' element={<BoardViewComponent/>}/>
                    <Route path='/상품문의글목록' element={<ProductInquiryComponent/>}/>
                    <Route path='/상품문의글내용/:id' element={<ProductInquiryViewComponent/>}/>
                    <Route path='/상품문의글내용' element={<ProductInquiryViewComponent/>}/>
                    <Route path='/상품문의글작성' element={<ProductWriteFormComponent/>}/>
                    <Route path='/상품문의글수정폼' element={<ProductInquiryUpdateComponent/>}/>
                    <Route path='/장바구니' element={<BasketComponent/>}/>
                    <Route path='/회원정보수정' element={<UpdateComponent/>}/>
                    <Route path='/아이디찾기' element={<IdSearchComponent />}/>
                    <Route path='/비밀번호찾기'element={<PwSearchComponent/>}/>
                </Routes>
            </HashRouter>
        </div>
    );
};
