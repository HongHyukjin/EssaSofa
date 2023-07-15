import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import Section1Component from './main/Section1Component';
import Section2Component from './main/Section2Component';
import Section3Component from './main/Section3Component';
import Section4Component from './main/Section4Component';
import Section5Component from './main/Section5Component';
import Section6Component from './main/Section6Component';
import Section7Component from './main/Section7Component';
import Section8Component from './main/Section8Component';
import Section9Component from './main/Section9Component';
import Section10Component from './main/Section10Component';
import Section11Component from './main/Section11Component';
import Section12Component from './main/Section12Component';

export default function MainComponent () {

    const [state,setState] = React.useState({
        쇼핑 : []
    })

    const getProduct = () => {
        axios({
          url: './data/product.json',
          method: 'GET'
        })
          .then((res) => {
            setState({
              ...state,
              쇼핑: res.data.쇼핑,
            })
            localStorage.setItem('쇼핑', JSON.stringify(res.data.쇼핑));
          })
          .catch((err) => {
            console.log("AXIOS 오류!" + err)
          })
    }

    React.useEffect(() => {
        getProduct();
    }, [])

    return (
        <main id='main'>
            <Section1Component/>
            <Section2Component/>
            <Section3Component/>
            <Section4Component 쇼핑={state.쇼핑} />
            <Section5Component 쇼핑={state.쇼핑} />
            <Section6Component 쇼핑={state.쇼핑} />
            <Section7Component 쇼핑={state.쇼핑} />
            <Section8Component/>
            <Section9Component 쇼핑={state.쇼핑} />
            <Section10Component/>
            <Section11Component/>
            <Section12Component/>
        </main>
    );
};

