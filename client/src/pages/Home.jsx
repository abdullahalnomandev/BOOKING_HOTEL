import React from 'react';
import CitysSlider from '../components/Home/Citys';
import Header from '../components/Home/Header';
import Footer from '../components/common/Footer/Footer';
const Home = () => {


    return (
        <>
            <Header />
            {/* <SomeRooms /> */}
            <CitysSlider />
            <Footer />
        </>
    );
};

export default Home;