import Footer from "../components/common/Footer/Footer";
import Citys from "../components/Home/Citys";
import ClientReviews from "../components/Home/ClientReviews";
import Header from "../components/Home/Header";
import HotelHeroWithModalVideo from "../components/Home/HotelHeaderWithModelVideo";
import SomeHotels from "../components/Home/SomeHotels";
import ScrollToggle from "../components/ScrollToggle";

const Home = () => {
  return (
    <>
      <Header />
      {/* <VedioPlayer /> */}
      <HotelHeroWithModalVideo />
      <SomeHotels />
      <Citys />
      <ClientReviews />
      <Footer />
      <ScrollToggle />
    </>
  );
};

export default Home;
