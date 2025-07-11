import { Avatar, Button, Input, message, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { GET_ROOMS } from "../../../Api/ApiConstant";
import { getData } from "../../../Api/commonServices";
import AddRoomModal from "./AddRoomModal";

const { Title, Text } = Typography;
const { Search } = Input;

const ManageRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [loading, setLoading] = useState(true);

  /** ───────────────────────────────────────
   *  Fetch rooms
   * ─────────────────────────────────────── */
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const { data } = await getData(GET_ROOMS, {
        lowestPrice: 0,
        heightPrice: 500,
      });
      const reversed = data.rooms.slice().reverse();
      setRooms(reversed);
      setFilteredRooms(
        searchTerm
          ? reversed.filter((r) =>
              r.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : reversed
      );
    } catch (err) {
      message.error("Failed to fetch rooms.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* re‑fetch after add / edit actions */
  useEffect(() => {
    if (refreshFlag) {
      fetchRooms();
      setRefreshFlag(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshFlag]);

  /** ───────────────────────────────────────
   *  Search
   * ─────────────────────────────────────── */
  const onSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredRooms(
      value
        ? rooms.filter((room) =>
            room.title.toLowerCase().includes(value.toLowerCase())
          )
        : rooms
    );
  };

  /** ───────────────────────────────────────
   *  Table definition
   * ─────────────────────────────────────── */
  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (src: string) => (
        <Avatar
          shape='square'
          size={50}
          src={src}
          style={{ borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Room Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: any, b: any) => a.price - b.price,
      render: (p: number) => `$${p}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Button
            danger
            onClick={() => message.info("Delete feature coming soon")}>
            Delete
          </Button>
          <Button
            onClick={() => message.info("Update feature coming very soon")}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* ────────────── Add / Search bar ────────────── */}
      <AddRoomModal
        isRoomModalVisible={isRoomModalVisible}
        setIsRoomModalVisible={setIsRoomModalVisible}
        setRender={setRefreshFlag}
      />

      <div
        style={{
          marginBottom: 24,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
        <Search
          placeholder='Search Room'
          allowClear
          disabled={loading}
          onSearch={onSearch}
          onChange={(e) => onSearch(e.target.value)}
          style={{ maxWidth: 400, flexGrow: 1 }}
        />
        <Button
          type='primary'
          style={{ minWidth: 140 }}
          onClick={() => setIsRoomModalVisible(true)}
          disabled={loading}>
          + Add New Room
        </Button>
      </div>

      {/* ────────────── Table / Empty State ────────────── */}
      {filteredRooms.length === 0 && !loading ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Title level={4}>No rooms found.</Title>
          <Text type='secondary'>
            Try adding a new room or adjust your search.
          </Text>
        </div>
      ) : (
        <Table
          rowKey='_id'
          loading={loading}
          columns={columns}
          dataSource={filteredRooms}
          pagination={{
            pageSize: 6,
            showSizeChanger: false,
          }}
        />
      )}
    </div>
  );
};

export default ManageRoom;
