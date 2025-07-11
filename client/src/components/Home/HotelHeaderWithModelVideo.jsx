import { CaretRightFilled } from "@ant-design/icons";
import { Typography } from "antd";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import "./HotelHeroWithModalVideo.css"; // animation + layout

const { Title, Text } = Typography;

const HotelHeroWithModalVideo = ({ url }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className='hero-wrapper'>
      {/* ─────────── Header copy ─────────── */}
      <div
        className='hero-header head-content'
        style={{ marginBottom: "40px", marginTop: "40px" }}>
        <Title level={1} className='hero-heading'>
          Experience <span className='accent'>Unparalleled Luxury</span>
        </Title>
        <Text className='hero-subtitle' type='secondary'>
          World-class Accommodations • Breathtaking Destinations • Exceptional
          Service
        </Text>
      </div>

      {/* ─────────── Video banner ─────────── */}
      <section className='hero-video-section'>
        <img
          src={
            url ??
            "https://www.trulyclassy.com/wp-content/uploads/2022/03/IMG_1697.jpg"
          }
          alt='Luxury cabin in the snow'
          className='hero-banner'
          onClick={() => setOpen(true)}
        />

        <div className='overlay' />

        <button
          type='button'
          aria-label='Play resort introduction video'
          className='play-btn'
          onClick={() => setOpen(true)}>
          <CaretRightFilled className='icon' />
        </button>

        <ModalVideo
          channel='vimeo'
          isOpen={open}
          videoId='746166783'
          autoplay
          onClose={() => setOpen(false)}
        />
      </section>
    </header>
  );
};

export default HotelHeroWithModalVideo;
