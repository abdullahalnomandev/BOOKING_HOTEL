import React from 'react';
import CitysSlider from '../components/Home/Citys';
import Header from '../components/Home/Header';
import Footer from '../components/common/Footer/Footer';
import SomeHotels from '../components/Home/SomeHotels';
const Home = () => {


    return (
        <>
            <Header />
            <SomeHotels />
            {/* <CitysSlider /> */}
            <Footer />
        </>
    );
};

export default Home;