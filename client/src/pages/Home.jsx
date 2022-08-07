import React from 'react';
import CitysSlider from '../components/Home/Citys';
import Header from '../components/Home/Header';
import SomeRooms from '../components/Home/SomeRooms';
import Scroll from 'react-scroll';
import Footer from '../components/common/Footer/Footer';
const Home = () => {

var Link = Scroll.Link;
var Element = Scroll.Element;


    return (
        <Element>
            <Header />
            <SomeRooms />
            <CitysSlider />
            <Footer />
        </Element>
    );
};

export default Home;