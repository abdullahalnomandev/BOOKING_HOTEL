import { Avatar, Button, Input, message, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { DELETE_HOTEL, GET_ALL_CITY_HOTELS } from "../../../Api/ApiConstant";
import { deleteData, getData } from "../../../Api/commonServices";
import AddHotelModal from "./AddHotelModal";

const { Title, Text } = Typography;
const { Search } = Input;

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [isAddHotelModalVisible, setIsAddHotelModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const getHotels = async () => {
    setLoading(true);
    try {
      const { data } = await getData(GET_ALL_CITY_HOTELS);
      const reversed = data.hotels.allHotels.slice().reverse();
      setHotels(reversed);
      setFilteredHotels(reversed);
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
      message.success(data.data.message || "Hotel deleted successfully.");
      getHotels();
    } catch (err) {
      message.error(err?.response?.data?.message || "Failed to delete hotel.");
      console.error(err);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  useEffect(() => {
    if (render) {
      getHotels();
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

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const pagedHotels = filteredHotels.slice(startIndex, startIndex + pageSize);

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <Avatar
          shape='square'
          size={50}
          src={photo}
          style={{ borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Hotel Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text) => text?.toUpperCase(),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size='middle'>
          <Button danger onClick={() => deleteHotel(record._id)}>
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
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <AddHotelModal
        isAddHotelModalVisible={isAddHotelModalVisible}
        setIsAddHotelModalVisible={setIsAddHotelModalVisible}
        setRender={setRender}
      />

      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}>
        <Search
          placeholder='Search Hotel'
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          style={{ maxWidth: 400, flexGrow: 1 }}
          disabled={loading}
        />
        <Button
          type='primary'
          onClick={() => setIsAddHotelModalVisible(true)}
          disabled={loading}
          size='medium'>
          + Add Hotel
        </Button>
      </div>

      {filteredHotels.length === 0 && !loading ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Title level={4}>No hotels found.</Title>
          <Text type='secondary'>
            Try adding a new hotel or adjust your search.
          </Text>
        </div>
      ) : (
        <Table
          rowKey='_id'
          loading={loading}
          columns={columns}
          dataSource={pagedHotels}
          pagination={{
            current: currentPage,
            pageSize,
            total: filteredHotels.length,
            onChange: onPageChange,
            showSizeChanger: false,
          }}
        />
      )}
    </div>
  );
};

export default ManageHotels;
