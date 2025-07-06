import { Card, Col, Row, Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_HOTELS } from "../../Api/ApiConstant";
import { getData } from "../../Api/commonServices";
import "./SomeHotels.css";

const { Option } = Select;

const SomeHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [citys, setCitys] = useState("dhaka");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleClickRooms = (id) => {
    navigate("/rooms", { state: id });
  };

  const handleChange = (value) => {
    setCitys(value);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const { data } = await getData(GET_HOTELS, { city: citys });
        setHotels(data.hotels.allHotels);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [citys]);

  const renderSkeletonCards = () =>
    Array.from({ length: 4 }).map((_, index) => (
      <Col key={index} xs={24} sm={12} md={8} lg={6}>
        <Card>
          <Skeleton
            active
            avatar={false}
            title={{ width: "100%" }}
            paragraph={{
              rows: 3,
              width: ["100%", "90%", "60%"],
            }}
          />
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <Skeleton.Button
              active
              size='small'
              style={{ width: 80, borderRadius: 4 }}
            />
          </div>
        </Card>
      </Col>
    ));

  return (
    <div style={{ padding: "0 5%" }}>
      <div
        className='head-content'
        style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1>
          SOME TOP <span style={{ color: "#fe5d5d" }}>HOTELS</span>
        </h1>

        <div style={{ marginTop: "16px" }}>
          <Select
            showSearch
            placeholder='Select a city'
            defaultValue='dhaka'
            onChange={handleChange}
            optionFilterProp='children'
            filterOption={(input, option) =>
              option?.children.toLowerCase().includes(input.toLowerCase())
            }
            className='custom-select'
            style={{
              width: 200,
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              border: "1px solid #d9d9d9",
            }}
            dropdownStyle={{
              borderRadius: "6px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
              backgroundColor: "#fff",
            }}
            popupClassName='custom-select-dropdown'>
            <Option value='dhaka' className='custom-select-option'>
              Dhaka
            </Option>
            <Option value='chittagong' className='custom-select-option'>
              Chittagong
            </Option>
            <Option value='rajshahi' className='custom-select-option'>
              Rajshahi
            </Option>
            <Option value='khulna' className='custom-select-option'>
              Khulna
            </Option>
            <Option value='sylhet' className='custom-select-option'>
              Sylhet
            </Option>
            <Option value='rangpur' className='custom-select-option'>
              Rangpur
            </Option>
            <Option value='mymensingh' className='custom-select-option'>
              Mymensingh
            </Option>
            <Option value='barisal' className='custom-select-option'>
              Barisal
            </Option>
          </Select>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {loading
          ? renderSkeletonCards()
          : hotels.slice(0, 4).map(({ _id, name, photo, city }) => (
              <Col key={_id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className='hotel-card'
                  cover={
                    <div className='card-image-container'>
                      <img
                        alt={name}
                        src={photo}
                        style={{
                          height: 240,
                          width: "100%",
                          objectFit: "cover",
                          borderRadius: "8px 8px 0 0",
                        }}
                      />
                    </div>
                  }
                  bodyStyle={{
                    padding: "16px 20px",
                    backgroundColor: "#fff",
                  }}>
                  <div className='card-content'>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        marginBottom: 8,
                        color: "#2c3e50",
                      }}>
                      {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                    </h3>
                    <p
                      style={{
                        margin: "0 0 12px",
                        color: "#7f8c8d",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}>
                      <i className='fas fa-map-marker-alt' />
                      <span>
                        Located in <strong>{city}</strong>
                      </span>
                    </p>
                    <div
                      style={{
                        marginTop: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <button
                        className='view-rooms-btn'
                        onClick={() => handleClickRooms(_id)}
                        style={{
                          backgroundColor: "#1890ff",
                          color: "white",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontWeight: 500,
                          width: "100%",
                        }}>
                        View Available Rooms
                      </button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default SomeHotels;
