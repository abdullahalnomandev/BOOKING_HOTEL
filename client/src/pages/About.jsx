import { FaGlobe, FaHeart, FaHotel } from "react-icons/fa";
import Footer from "../components/common/Footer/Footer";
import NavBar from "../components/common/NavBar/NavBar";
import HotelHeroWithModalVideo from "../components/Home/HotelHeaderWithModelVideo";
import ScrollToggle from "../components/ScrollToggle";

const AboutPage = () => {
  const galleryImages = [
    {
      id: 1,
      url: "https://hotelhub.ditsolution.net/wp-content/uploads/2025/04/3-1.jpg",
    },
    {
      id: 2,
      url: "https://hotelhub.ditsolution.net/wp-content/uploads/2025/04/2.jpg",
    },
    {
      id: 3,
      url: "https://hotelhub.ditsolution.net/wp-content/uploads/2025/04/4.jpg",
    },
    {
      id: 4,
      url: "https://hotelhub.ditsolution.net/wp-content/uploads/2025/03/3.jpg",
    },
    {
      id: 5,
      url: "https://hotelhub.ditsolution.net/wp-content/uploads/2025/03/1.jpg",
    },
    {
      id: 6,
      url: "https://hotelhub.ditsolution.net/wp-content/uploads/2025/03/2.jpg",
    },
    {
      id: 7,
      url: "https://hotelhub.ditsolution.net/wp-content/uploads/2024/12/contact_img-1.jpg",
    },
    {
      id: 8,
      url: "https://hotelhub.ditsolution.net/wp-content/uploads/2025/06/img-123-1.jpg",
    },
  ];
  return (
    <>
      <div
        style={{ backgroundColor: "white", color: "#1f2937", padding: "0 5%" }}>
        {/* NAV */}
        <NavBar />
      </div>

      {/* HERO */}

      <div>
        <HotelHeroWithModalVideo url='https://hotelhub.ditsolution.net/wp-content/uploads/2024/12/contact_img-1.jpg' />

        {/* MISSION & VISION */}
        <section
          style={{
            padding: "0 5%",
            paddingTop: "4rem",
            backgroundColor: "#f3f4f6",
          }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              maxWidth: "1140px",
            }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h1>
                OUR <span style={{ color: "#fe5d5d" }}>MISSION </span>
              </h1>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.75 }}>
                Our mission is to simplify the hotel booking process, offering a
                seamless and enjoyable experience for every traveler. We strive
                to connect guests with a diverse range of accommodations—from
                luxurious resorts to cozy boutique hotels—ensuring comfort,
                convenience, and value.
              </p>
            </div>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h1>
                OUR <span style={{ color: "#fe5d5d" }}>VISION </span>
              </h1>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.75 }}>
                We envision a world where travel planning is effortless and
                accessible. Leveraging cutting‑edge technology and fostering
                strong partnerships, we aim to be the leading global platform
                for hotel reservations—renowned for reliability, innovation, and
                exceptional service.
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section
          style={{
            padding: "4rem 1rem",
            background: "linear-gradient(to right, #eff6ff, #f5f3ff, #ecfdf5)",
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
              maxWidth: "1140px",
              margin: "0 auto",
              textAlign: "center",
            }}>
            <div>
              <FaGlobe
                size={40}
                style={{ marginBottom: "1rem", color: "#2563eb" }}
              />
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>120+</p>
              <span
                style={{
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                  color: "#4b5563",
                }}>
                Countries Covered
              </span>
            </div>
            <div>
              <FaHotel
                size={40}
                style={{ marginBottom: "1rem", color: "#10b981" }}
              />
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>50k+</p>
              <span
                style={{
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                  color: "#4b5563",
                }}>
                Hotels Listed
              </span>
            </div>
            <div>
              <FaHeart
                size={40}
                style={{ marginBottom: "1rem", color: "#ef4444" }}
              />
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>98%</p>
              <span
                style={{
                  textTransform: "uppercase",
                  fontSize: "0.875rem",
                  color: "#4b5563",
                }}>
                Happy Guests
              </span>
            </div>
          </div>
        </section>
      </div>
      {/* Gallary  */}
      <section
        style={{
          padding: "2rem 5%",
          backgroundColor: "#ffffff",
          margin: "0 auto",
        }}>
        <h1
          style={{
            fontFamily: "Times New Roman",
            textAlign: "center",
            fontSize: "2rem",
            paddingBottom: "1rem",
          }}>
          OUR <span style={{ color: "#fe5d5d" }}>GALLERY</span>
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}>
          {galleryImages.map(({ id, url }) => (
            <div
              key={id}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }>
              <img
                src={url}
                alt={`Gallery ${id}`}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </section>
      {/* FOOTER */}
      <Footer />

      <ScrollToggle />
    </>
  );
};

export default AboutPage;
