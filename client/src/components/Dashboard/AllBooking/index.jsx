import { Button, Empty, Skeleton, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GET_ALL_BOOKING } from "../../../Api/ApiConstant";
import { getData } from "../../../Api/commonServices";

const { Title } = Typography;

const AllBooking = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const { data } = await getData(GET_ALL_BOOKING);
        setBooking(data.booking);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getRoomDetails();
  }, []);

  const columns = [
    {
      title: "Hotel Name",
      dataIndex: "hotel",
      key: "hotel",
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Booking Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => id.slice(0, 10),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Room Numbers",
      dataIndex: "roomNumbers",
      key: "roomNumbers",
      render: (rooms: string[]) => (
        <>
          {rooms.map((room) => (
            <Tag key={room} color='blue' style={{ marginBottom: 4 }}>
              {room}
            </Tag>
          ))}
        </>
      ),
    },
  ];

  // ✅ Header extracted above return
  const header = (
    <div className='text-center mb-6'>
      <Title level={2}>
        ALL <span style={{ color: "#fe5d5d" }}>BOOKING</span>
      </Title>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      {header}

      {loading ? (
        <Skeleton
          active
          paragraph={{ rows: 8 }}
          title={false}
          style={{ padding: 24 }}
        />
      ) : booking.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <>
              <Title level={4} style={{ color: "red" }}>
                Sorry, You have no bookings! 🏨
              </Title>
              <Link to='/'>
                <Button type='primary' style={{ marginTop: 12 }}>
                  Let's Book a Room
                </Button>
              </Link>
            </>
          }
        />
      ) : (
        <Table
          rowKey='_id'
          dataSource={booking}
          columns={columns}
          pagination={{ pageSize: 8 }}
        />
      )}
    </div>
  );
};

export default AllBooking;
