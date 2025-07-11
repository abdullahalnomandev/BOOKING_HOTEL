import { FaGlobe, FaHeart, FaHotel } from "react-icons/fa";

const Status = () => {
  return (
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
  );
};

export default Status;
