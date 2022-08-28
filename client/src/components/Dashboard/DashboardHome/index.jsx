import { Card, Row, Col, Space, Progress } from "antd";
import React from "react";
import { FiUsers } from "react-icons/fi";
import { SiGridsome } from "react-icons/si";
import { BiBarChartAlt } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FiArrowDown } from "react-icons/fi";
import "./index.css";
import { useState } from "react";
import ReactApexChart from "apexcharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from 'react-chartjs-2';
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const items = [
  {
    id: 1,
    action: 24000,
    title: "BUDGET",
    icon: <FiUsers />,
    reateIcon: <FiArrowDown />,
    rate: "12%",
    color: "#ED4740"
  },
  {
    id: 2,
    title: "TOTAL USERS",
    action: 1600,
    icon: <SiGridsome />,
    reateIcon: <AiOutlineArrowUp />,
    rate: "12%",
    color: "#45B880"
  },
  {
    id: 3,
    title: "PROGRESS",
    icon: <BiBarChartAlt />,
    action: 75.5,
    reateIcon: <AiOutlineArrowUp />,
    rate: "12%",
    color: "#0767DB"
  },
  {
    id: 4,
    title: "TOTAL PROFIT",
    icon: <BsCurrencyDollar />,
    action: 23200,
    rate: "12%",
    color: "#FFFFFF"
  }
];
const DashboardHome = () => {

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
   labels,
   datasets: [
     {
       label: "Dataset 1",
       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
       backgroundColor: "rgba(255, 99, 132, 0.5)"
     },
     {
       label: "Dataset 2",
       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
       backgroundColor: "rgba(53, 162, 235, 0.5)"
     }
   ]
 };
  return (
    <div style={{paddingBottom:'25px'}}>
      <Row gutter={[14, 14]}>
        {items.map(({ id, title, icon, action, color, reateIcon }) => (
          <Col
            md={{ span: 8 }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            lg={{ span: 6 }}
            key={id}
          >
            <Card
              style={{ background: id === 4 ? "#0767DB" : "", height: "150px" }}
            >
              <div className="d-flex justify-between align-center">
                <div>
                  <h4 style={{ color: id === 4 ? "#ffff" : "gray" }}>
                    {title}
                  </h4>
                  <h1 style={{ color: id === 4 ? "#ffff" : "" }}>
                    {id === 1 || id === 4 ? "$" : ""} {action}{" "}
                    {id === 3 ? "%" : ""}
                  </h1>
                </div>
                <span
                  style={{
                    backgroundColor: color,
                    width: "60px",
                    height: "60px",
                    borderRadius: " 50%",
                    textAlign: "center",
                    fontSize: "30px",
                    paddingTop: "3%"
                  }}
                >
                  {icon}
                </span>
              </div>
              {id === 3 && <Progress percent={75.5} status="active" />}
              {(id === 1 || id === 2) && (
                <p>
                  <span style={{ color: color }}> {reateIcon}12% </span> Since
                  last month
                </p>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      {/* Chart  */}
      <Row>
        <Col md={24}>
          <Bar options={options} data={data} />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;