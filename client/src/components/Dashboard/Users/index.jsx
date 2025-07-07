import { Avatar, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { GET_USERS } from "../../../Api/ApiConstant";
import { getData } from "../../../Api/commonServices";
import "./index.css";

const { Title } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const { data } = await getData(GET_USERS);
        setUsers(data.users.reverse());
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className='flex items-center gap-2'>
          <Avatar src={record.photo} size={48} />
          <span>{record.name}</span>
        </div>
      ),
    },

    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "role",
      render: (isAdmin) =>
        isAdmin ? <Tag color='red'>Admin</Tag> : <Tag color='blue'>User</Tag>,
    },
    {
      title: "Registration Date",
      dataIndex: "registration",
      key: "registration",
      render: (reg) => new Date(Number(reg)).toLocaleDateString(),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div className='text-center mb-6'>
        <Title level={2}>
          All <span style={{ color: "#fe5d5d" }}>USERS</span>
        </Title>
      </div>

      {loading ? (
        <div className='custom-skeleton-table'>
          {[...Array(6)].map((_, i) => (
            <div className='skeleton-row' key={i}>
              <div className='skeleton-cell avatar-cell'>
                <div className='skeleton-avatar' />
                <div className='skeleton-name' />
              </div>
              <div className='skeleton-cell short' />
              <div className='skeleton-cell medium' />
              <div className='skeleton-cell tag' />
              <div className='skeleton-cell short' />
            </div>
          ))}
        </div>
      ) : (
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 8 }}
          bordered
        />
      )}
    </div>
  );
};

export default Users;
