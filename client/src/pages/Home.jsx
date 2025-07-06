import Footer from "../components/common/Footer/Footer";
import Header from "../components/Home/Header";
import SomeHotels from "../components/Home/SomeHotels";
import VedioPlayer from "../components/Home/VedioPlayer/VedioPlayer";
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
