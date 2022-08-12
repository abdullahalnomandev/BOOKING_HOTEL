import { Checkbox, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingRoomModal = ({
  isBookingModalVisible,
  setIsBookingModalVisible
}) => {
const onChange = (checkedValues) => {
  console.log("checked = ", checkedValues);
};


  const plainOptions = ["Apple", "Pear", "Orange"];
  const options = [
    {
      label: "Apple",
      value: "Apple"
    },
    {
      label: "Pear",
      value: "Pear"
    },
    {
      label: "Orange",
      value: "Orange"
    }
  ];
  const optionsWithDisabled = [
    {
      label: "Apple",
      value: "Apple"
    },
    {
      label: "Pear",
      value: "Pear"
    },
    {
      label: "Orange",
      value: "Orange",
      disabled: false
    }
  ];
const navigate= useNavigate();
  return (
    <div>
      <Modal
        title="Select your rooms:"
        visible={isBookingModalVisible}
        onCancel={() => setIsBookingModalVisible(false)}
        footer={null}
      >
        <Row>
          <Col span={18}>
            <h5>King size bed, 1 bathroom,balcony</h5>
            <p>Max People:2</p>
          </Col>
          <Col span={6}>
            <Checkbox.Group
              style={{
                width: "100%"
              }}
              onChange={onChange}
            >
              <Row>
                <Col span={12}>
                  <Checkbox value="A">101</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="B">102</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="C">103</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="D">104</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <h5>2 small bed, 1 bathroom,1balcony</h5>
            <p>Max People:4</p>
          </Col>
          <Col span={6}>
            <Checkbox.Group
              style={{
                width: "100%"
              }}
              onChange={onChange}
            >
              <Row>
                <Col span={12}>
                  <Checkbox value="A">101</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="B">102</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="C">103</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="D">104</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>
        <button className="btn-secondary " style={{ width: "100%" }} onClick={()=>{
          alert("Login ,Register system coming.... ");
          setIsBookingModalVisible(false);
          navigate('/login')
        }}>
          Reserve Now !
        </button>{" "}
      </Modal>
    </div>
  );
};

export default BookingRoomModal;
