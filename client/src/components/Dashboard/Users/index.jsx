import { Avatar, Card, Space, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { GET_USERS } from "../../../Api/ApiConstant";
import { getData } from "../../../Api/commonServices";

const { Title, Text } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getData(GET_USERS);
        setUsers(data.users.reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <Space>
          <Avatar src={record.photo} size={40} />
          <Text strong>{record.name}</Text>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <Text type='secondary'>{email}</Text>,
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "role",
      render: (isAdmin: boolean) =>
        isAdmin ? <Tag color='red'>Admin</Tag> : <Tag color='blue'>User</Tag>,
    },
    {
      title: "Registered",
      dataIndex: "registration",
      key: "registration",
      render: (reg: string | number) => (
        <Text>
          {new Date(Number(reg)).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}>
      <Card bordered={false} style={{ margin: "0 auto" }}>
        <div>
          <Title level={2}>
            All <span style={{ color: "#fe5d5d" }}>Users</span>
          </Title>
        </div>

        <Table
          rowKey='_id'
          columns={columns}
          dataSource={users}
          loading={loading}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          size='middle'
        />
      </Card>
    </div>
  );
};

export default Users;
