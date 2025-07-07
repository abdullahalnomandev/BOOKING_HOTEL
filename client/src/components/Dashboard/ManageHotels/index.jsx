import {
  Button,
  Card,
  Col,
  Input,
  message,
  Pagination,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { DELETE_HOTEL, GET_ALL_CITY_HOTELS } from "../../../Api/ApiConstant";
import { deleteData, getData } from "../../../Api/commonServices";
import AddHotelModal from "./AddHotelModal";

const { Search } = Input;
const { Title, Text } = Typography;

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [isAddHotelModalVisible, setIsAddHotelModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const getPost = async () => {
    setLoading(true);
    try {
      const { data } = await getData(GET_ALL_CITY_HOTELS, {});
      const reversedHotels = data.hotels.allHotels.slice().reverse();
      setHotels(reversedHotels);
      setFilteredHotels(reversedHotels);
    } catch (err) {
      message.error("Failed to fetch hotels.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteHotel = async (hotelId) => {
    try {
      const data = await deleteData(DELETE_HOTEL, { hotelId });
      message.success(data.data.message || "Hotel deleted successfully.", 3);
      getPost();
    } catch (errors) {
      message.error(
        errors?.response?.data?.message || "Failed to delete hotel."
      );
      console.error(errors);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (render) {
      getPost();
      setRender(false);
    }
  }, [render]);

  const handleSearch = (value) => {
    const filtered = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredHotels(filtered);
    setCurrentPage(1);
  };

  // Live search as user types
  const onSearchChange = (e) => {
    handleSearch(e.target.value);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentHotels = filteredHotels.slice(startIndex, startIndex + pageSize);

  const skeletonCards = Array(pageSize).fill(null);

  return (
    <div>
      <AddHotelModal
        isAddHotelModalVisible={isAddHotelModalVisible}
        setIsAddHotelModalVisible={setIsAddHotelModalVisible}
        setRender={setRender}
      />

      <div
        className='d-flex justify-between align-center'
        style={{ marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <Search
          placeholder='Search Hotel'
          onSearch={handleSearch}
          onChange={onSearchChange}
          allowClear
          style={{ maxWidth: 400, flexGrow: 1 }}
          disabled={loading}
        />
        <Button
          type='primary'
          onClick={() => setIsAddHotelModalVisible(true)}
          style={{ minWidth: 140 }}
          disabled={loading}>
          + Add Hotel
        </Button>
      </div>

      {loading ? (
        <Row gutter={[16, 24]}>
          {skeletonCards.map((_, idx) => (
            <Col
              key={idx}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              style={{ display: "flex" }}>
              <Card style={{ width: "100%", borderRadius: 8 }}>
                <div
                  style={{
                    width: "100%",
                    height: 160,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                />
                <Skeleton
                  active
                  paragraph={{ rows: 3, width: ["60%", "80%", "40%"] }}
                  title={false}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : filteredHotels.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Title level={4} style={{ marginTop: 24 }}>
            No hotels found.
          </Title>
          <Text type='secondary'>
            Try adding a new hotel or adjust your search.
          </Text>
        </div>
      ) : (
        <>
          <Row gutter={[16, 24]}>
            {currentHotels.map(({ name, photo, city, address, email, _id }) => (
              <Col
                key={_id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                style={{ display: "flex" }}>
                <Card
                  hoverable
                  style={{ width: "100%", borderRadius: 8 }}
                  cover={
                    <img
                      alt={name}
                      src={photo}
                      style={{
                        height: 160,
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  }>
                  <Title level={5} style={{ marginBottom: 4 }}>
                    {name}
                  </Title>
                  <Text type='secondary' style={{ fontWeight: "600" }}>
                    City: {city.toUpperCase()}
                  </Text>
                  <p style={{ marginTop: 4, marginBottom: 8 }}>{address}</p>
                  {email && <p style={{ marginBottom: 12 }}>{email}</p>}

                  <Space size='middle'>
                    <Button danger onClick={() => deleteHotel(_id)}>
                      Delete
                    </Button>
                    <Button
                      type='default'
                      onClick={() =>
                        message.info("This feature will be updated very soon.")
                      }>
                      Update
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          {filteredHotels.length > pageSize && (
            <div
              style={{
                marginTop: 32,
                paddingBottom: 32,
                textAlign: "center",
              }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredHotels.length}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageHotels;
