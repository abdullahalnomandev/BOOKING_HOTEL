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
import { GET_ROOMS } from "../../../Api/ApiConstant";
import { getData } from "../../../Api/commonServices";
import AddRoomModal from "./AddRoomModal";

const { Title, Text } = Typography;

const ManageRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // <-- controlled input
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const getPost = async () => {
    setLoading(true);
    try {
      const { data } = await getData(GET_ROOMS, {
        lowestPrice: 0,
        heightPrice: 500,
      });
      const reversedRooms = data.rooms.slice().reverse();
      setRooms(reversedRooms);
      // Apply search filter if any
      if (searchTerm.trim() !== "") {
        const filtered = reversedRooms.filter((room) =>
          room.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRooms(filtered);
      } else {
        setFilteredRooms(reversedRooms);
      }
    } catch (err) {
      message.error("Failed to fetch rooms.");
      console.error(err);
    } finally {
      setLoading(false);
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
  }, [render, getPost]);

  // Filter rooms as user types
  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) =>
        room.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentRooms = filteredRooms.slice(startIndex, startIndex + pageSize);

  const skeletonCards = Array(pageSize).fill(null);

  return (
    <div>
      <AddRoomModal
        isRoomModalVisible={isRoomModalVisible}
        setIsRoomModalVisible={setIsRoomModalVisible}
        setRender={setRender}
      />

      <div
        className='d-flex justify-between align-center'
        style={{ marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        {/* Controlled Input */}
        <Input
          placeholder='Search Room'
          value={searchTerm}
          onChange={onSearchChange}
          allowClear
          style={{ maxWidth: 400, flexGrow: 1 }}
          disabled={loading}
        />
        <Button
          type='primary'
          onClick={() => setIsRoomModalVisible(true)}
          style={{ minWidth: 140 }}
          disabled={loading}>
          + Add New Room
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
      ) : filteredRooms.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Title level={4} style={{ marginTop: 24 }}>
            No rooms found.
          </Title>
          <Text type='secondary'>
            Try adding a new room or adjust your search.
          </Text>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 24]}>
            {currentRooms.map(({ title, photo, price, _id }) => (
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
                      alt={title}
                      src={photo}
                      style={{
                        height: 160,
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  }>
                  <Title level={5} style={{ marginBottom: 4 }}>
                    {title}
                  </Title>
                  <Text type='secondary' style={{ fontWeight: "600" }}>
                    Price: ${price}
                  </Text>

                  <Space size='middle' style={{ marginTop: 12 }}>
                    <Button
                      danger
                      onClick={() =>
                        message.info("Delete feature coming soon")
                      }>
                      Delete
                    </Button>
                    <Button
                      type='default'
                      onClick={() =>
                        message.info("Update feature coming very soon")
                      }>
                      Update
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          {filteredRooms.length > pageSize && (
            <div
              style={{
                marginTop: 32,
                paddingBottom: 32,
                textAlign: "center",
              }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredRooms.length}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageRoom;
