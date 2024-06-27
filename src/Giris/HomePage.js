// burası ana sayfamız

import React, { useEffect, useState } from "react";
import {
  TeamOutlined,
  UserOutlined,
  OrderedListOutlined,
  EllipsisOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Synergy from "../Text/Synergy";
import Yapilacak from "../Card/Yapilacak";
import { getCurrentUser } from "../config/firebase"; // Import the getCurrentUser function

const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [items, setItems] = useState([
    {
      label: "Team",
      key: "sub2",
      icon: <TeamOutlined />,
      children: [],
    },
    {
      label: "Kullanıcı",
      key: "sub1",
      icon: <UserOutlined />,
      children: [
        { label: "Takvim", key: "3", icon: <OrderedListOutlined /> },
        { label: "Çizelge", key: "4", icon: <EllipsisOutlined /> },
        { label: "Logout", key: "5", icon: <LoginOutlined /> },
      ],
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = await getCurrentUser();
      if (user) {
        setItems((prevItems) => {
          const updatedItems = [...prevItems];
          const userMenuItem = updatedItems.find((item) => item.key === "sub1");
          if (userMenuItem) {
            userMenuItem.label = user.displayName;
          }
          return updatedItems;
        });
      }
    };

    fetchUserName();
  }, []);

  const handleMenuItemClick = (key) => {
    if (key === "5") {
      navigate("/"); // Redirect to Sign In page
    } else if (key === "3") {
      navigate("/takvim"); // Navigate to Profil page
    } else if (key === "4") {
      navigate("/cizelge");
    }
  };

  const handleNewTeam = () => {
    setTeamModalVisible(true);
  };

  const handleCancel = () => {
    setTeamModalVisible(false);
    setNewTeamName("");
  };

  const handleOk = () => {
    const newKey = `team${items.length + 1}`;
    const newItem = { label: newTeamName, key: newKey };

    const teamSubMenu = items.find((item) => item.key === "sub2");

    if (teamSubMenu) {
      teamSubMenu.children = [...teamSubMenu.children, newItem];
      setItems([...items]);
    }

    setTeamModalVisible(false);
    setNewTeamName("");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          <div
            style={{
              fontSize: "20px",
              color: "white",
              textAlign: "center",
              padding: "1px 6px",
            }}
          >
            <Synergy />
          </div>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={({ key }) => handleMenuItemClick(key)}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key} icon={child.icon}>
                    {" "}
                    {child.label}
                  </Menu.Item>
                ))}
                {item.key === "sub2" && (
                  <Menu.Item
                    key="newTeam"
                    icon={<TeamOutlined />}
                    onClick={handleNewTeam}
                  >
                    Yeni Team Ekle
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <Yapilacak />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          İrem ©{new Date().getFullYear()} Created by İEG
        </Footer>
      </Layout>
      <Modal
        title="Yeni Team Oluştur"
        visible={teamModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Oluştur"
        cancelText="İptal"
      >
        <Form.Item label="Team Adı">
          <Input
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
        </Form.Item>
      </Modal>
    </Layout>
  );
};

export default HomePage;
