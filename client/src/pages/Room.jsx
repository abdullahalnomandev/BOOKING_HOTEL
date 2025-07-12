import { useEffect } from "react";
import Footer from "../components/common/Footer/Footer";
import NavBar from "../components/common/NavBar/NavBar";
import SingleRoom from "../components/SingleRoom/SingleRoom";

const Room = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div style={{ padding: "0 5%" }}>
        <NavBar />
      </div>
      <div style={{ padding: "0 5%", background: "#ddd" }}>
        <SingleRoom />
      </div>
      <Footer />
    </>
  );
};

export default Room;
