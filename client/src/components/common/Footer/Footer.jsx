import { Col, Row } from "antd";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // optional
import logo from "../../../assets/site-logo.png";
import "./footer.css";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Apartments", to: "/apartments" },
  { label: "Resorts", to: "/resorts" },
  { label: "Villas", to: "/villas" },
];

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <Row gutter={[32, 32]}>
          {/* ---- Brand & address ---- */}
          <Col md={8} xs={24}>
            <img src={logo} alt='Dream Booking logo' className='footer__logo' />

            <p className='footer__text'>
              Experience luxury and comfort at our premier hotel destinations.
              We provide exceptional hospitality and memorable stays.
            </p>
            <address className='footer__text'>Dhaka, Bangladesh</address>

            <div className='footer__social'>
              <a href='#' aria-label='Facebook'>
                <FaFacebookF />
              </a>
              <a href='#' aria-label='Twitter'>
                <FaTwitter />
              </a>
              <a href='#' aria-label='Instagram'>
                <FaInstagram />
              </a>
              <a href='#' aria-label='LinkedIn'>
                <FaLinkedinIn />
              </a>
            </div>
          </Col>

          {/* ---- Quick links ---- */}
          <Col md={8} xs={24}>
            <h4 className='footer__heading'>Quick Links</h4>
            <ul className='footer__list'>
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  {/* Swap <Link> for <a> if not using React Router */}
                  <Link to={to} className='footer__link'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* ---- World map ---- */}
          <Col md={8} xs={24}>
            <h4 className='footer__heading'>Global Presence</h4>
            <div className='footer__global'>
              <p className='footer__text'>
                Serving customers worldwide with locations across:
              </p>
              <ul className='footer__list'>
                <li>North America</li>
                <li>Europe</li>
                <li>Asia Pacific</li>
                <li>Middle East</li>
              </ul>
              <p className='footer__text'>24/7 support in multiple languages</p>
            </div>
          </Col>
        </Row>

        {/* ---- Copyright ---- */}
        <div className='footer__copy'>
          &copy; {new Date().getFullYear()} Dream Booking.&nbsp;All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
