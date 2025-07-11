import { Alert, Card, Col, Form, Input, Modal, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { CHECK_ROOM_AVAILABILITY, CREATE_BOOKING } from "../../Api/ApiConstant";
import { patchData, postData } from "../../Api/commonServices";
import { useBookingContext } from "../../context/BookingContext";
import useAuth from "./../../hooks/useAuth";

const BookingRoomModal = ({
  isBookingModalVisible,
  setIsBookingModalVisible,
  room,
  hotel,
}) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [error, setError] = useState("Please select at least one room.");
  const [isBooked, setIsBooked] = useState([]);
  const { booking } = useBookingContext();
  const { isLogin, name, phone, address, id } = useAuth();
  const navigate = useNavigate();

  const getDateInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };

  const allDates = getDateInRange(
    booking?.arrival?._d || new Date(),
    booking?.departure?._d || new Date()
  );

  const isAvailable = (roomNumber) => {
    const dateStrings = allDates.map((date) => new Date(date).toDateString());
    const found = roomNumber?.unavailableDates?.some((date) =>
      dateStrings.includes(new Date(date).toDateString())
    );
    roomNumber.isTrue = found;
    return found;
  };

  const handleDisabled = () => {
    const status = room?.roomNumbers?.map((roomNo) => isAvailable(roomNo));
    setIsBooked(status);
  };
  // class
  useEffect(() => {
    handleDisabled();
  }, [isBookingModalVisible]);
  const handleChange = (roomId, e, isUnavailable) => {
    if (isUnavailable) return;

    const alreadySelected = selectedRooms.includes(roomId);
    const updated = alreadySelected
      ? selectedRooms.filter((id) => id !== roomId)
      : [...selectedRooms, roomId];

    setSelectedRooms(updated);
  };

  const handleClick = async () => {
    if (!selectedRooms.length) {
      setError("Please select at least one room.");
    } else {
      try {
        await Promise.all(
          selectedRooms.map((roomId) =>
            patchData(CHECK_ROOM_AVAILABILITY, {
              roomId,
              dates: allDates,
            })
          )
        );
      } catch (err) {
        console.error(err);
      }

      if (!isLogin) navigate("/login");
    }
  };

  const createNewBooking = async (bookingData) => {
    try {
      const { data } = await postData(CREATE_BOOKING, bookingData);
      if (data) {
        swal(
          `Congratulations, ${name?.split(" ")[0]}!`,
          "Your booking was successful.",
          "success"
        );
        setIsBookingModalVisible(false);
        navigate("/dashboard/my-bookings");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onFinish = (values) => {
    handleClick();

    const selectedRoomData = selectedRooms.map((roomId) =>
      room?.roomNumbers.find((r) => r._id === roomId)
    );
    const selectedRoomNumbers = selectedRoomData.map((r) => r.number);

    const bookingPayload = {
      name,
      date: new Date(),
      phone: values.phone,
      address: values.address,
      userId: id,
      hotel: hotel.name,
      hotelAddress: hotel.address,
      city: hotel.city,
      maxPeople: room.maxPeople,
      price: room.price,
      roomName: room.title,
      roomNumbers: selectedRoomNumbers,
    };

    if (selectedRooms.length > 0) {
      createNewBooking(bookingPayload);
    }
  };

  return (
    <Modal
      title={
        <span style={{ fontWeight: 600, fontSize: 18 }}>
          🛏️ Reserve Your Stay at {hotel?.name}
        </span>
      }
      visible={isBookingModalVisible}
      onCancel={() => setIsBookingModalVisible(false)}
      footer={null}>
      <Form
        layout='vertical'
        initialValues={{ phone, address }}
        onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <h3 style={{ fontWeight: 600, fontSize: 16 }}>🏨 Room Overview</h3>
            <p style={{ color: "#555", fontSize: 14, marginBottom: 8 }}>
              {room.title} —{" "}
              {room.description || "King-size bed, 1 bathroom, balcony"}
            </p>
            <p style={{ fontSize: 14, marginBottom: 16 }}>
              👥 <strong>Max Guests:</strong> {room.maxPeople}
            </p>

            <Form.Item
              name='phone'
              label=' Contact Number'
              rules={[
                { required: true, message: "Please enter your mobile number" },
              ]}>
              <Input placeholder='Enter your mobile number' />
            </Form.Item>

            <Form.Item
              name='address'
              label='Address'
              rules={[
                { required: true, message: "Please enter your address" },
              ]}>
              <Input.TextArea placeholder='Your full address' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Card style={{ marginBottom: "15px" }}>
              <p style={{ fontWeight: 500, marginBottom: 10 }}>
                Select Available Rooms
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {room?.roomNumbers?.map((roomNumber) => {
                  const isUnavailable = roomNumber.isTrue;
                  const isSelected = selectedRooms.includes(roomNumber._id);

                  return (
                    <Tooltip
                      title={
                        isUnavailable ? "Currently Unavailable" : "Available"
                      }
                      color={isUnavailable ? "red" : "green"}
                      key={roomNumber._id}>
                      <div
                        style={{
                          padding: "8px 12px",
                          borderRadius: "6px",
                          fontSize: 13,
                          color: "#fff",
                          cursor: isUnavailable ? "not-allowed" : "pointer",
                          backgroundColor: isUnavailable
                            ? "#ccc"
                            : isSelected
                            ? "#1677ff"
                            : "#52c41a",
                          transition: "all 0.2s",
                        }}
                        onClick={(e) =>
                          handleChange(roomNumber._id, e, isUnavailable)
                        }>
                        Room {roomNumber.number}
                      </div>
                    </Tooltip>
                  );
                })}
              </div>

              {!selectedRooms.length && (
                <Alert
                  style={{ marginTop: 15 }}
                  type='error'
                  message={error}
                  banner
                />
              )}
            </Card>
          </Col>
        </Row>

        <button
          style={{
            width: "100%",
            marginTop: 10,
            padding: "10px 0",
            backgroundColor: "#1677ff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          type='submit'>
          Confirm Book
        </button>
      </Form>
    </Modal>
  );
};

export default BookingRoomModal;
