import React from 'react';
import '../../../../node_modules/react-modal-video/css/modal-video.css';
import ModalVideo from "react-modal-video";
import { useState } from 'react';
import './VedioPlayer.css'
const VedioPlayer = () => {
    	const [isOpen, setOpen] = useState(false);

    return (
      <div style={{ zIndex: "2" }}>
        <ModalVideo
          channel="vimeo"
          isOpen={isOpen}
          vimeo={{ autoplay: true }}
          width={"330px"}
          height={"500px"}
          videoId="746166783"
          autoplay={true}
          onClose={() => setOpen(false)}
          theme="dark"
          playList="null"
        />

        <div style={{ width: "200px", float: "left" }}>
          <a
            id="play-video"
            className="video-play-button"
            href="#"
            onClick={() => setOpen(true)}
          >
            <span></span>
          </a>
        </div>
      </div>
    );
};

export default VedioPlayer;