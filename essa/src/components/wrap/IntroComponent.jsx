import React from 'react';
import $ from 'jquery';
import { Routes, Route} from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import MainComponent from './MainComponent';
import EssaClubComponent from './subPage/EssaClubComponent';
import UpgradeComponent from './subPage/UpgradeComponent';
import LovepetComponent from './subPage/LovepetComponent';
import EssainhouseComponent from './subPage/EssainhouseComponent';

function IntroComponent(props) {
    return (
        <>
            <HeaderComponent/>
                <Routes>
                    <Route index element={<MainComponent/>}/>
                    <Route path='/메인' element={<MainComponent/>}/>
                    <Route path='/클럽페이지' element={<EssaClubComponent/>}/>
                    <Route path='/업그레이드페이지' element={<UpgradeComponent/>}/>
                    <Route path='/러브펫페이지' element={<LovepetComponent/>}/>
                    <Route path='/인하우스페이지' element={<EssainhouseComponent/>}/>
                </Routes>           
            <FooterComponent/>
        </>
    );
}

export default IntroComponent;