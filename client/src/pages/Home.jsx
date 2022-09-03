import React from 'react';
import Header from '../components/Home/Header';
import Footer from '../components/common/Footer/Footer';
import SomeHotels from '../components/Home/SomeHotels';
import VedioPlayer from '../components/Home/VedioPlayer/VedioPlayer';
const Home = () => {


    return (
      <>
        <Header />
        <VedioPlayer />

        <SomeHotels />
        <Footer />
      </>
    );
};

export default Home;