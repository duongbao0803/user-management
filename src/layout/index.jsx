/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Layout, Menu, notification } from "antd";
import { HomeOutlined, UserAddOutlined } from "@ant-design/icons";
import { FloatButton } from "@/components";
import useAuth from "@/hooks/useAuth";
import Logo from "@/assets/image/logo_web.jpg";

const { Content, Sider, Footer } = Layout;

function getItem(label, key, icon, children, path) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user, isAuthenticated } = useAuth();
  const { t } = useTranslation("translation");

  const storeDefaultSelectedKeys = (keys) => {
    sessionStorage.setItem("keys", keys);
  };

  const resetDefaultSelectedKeys = () => {
    const selectedKeys = sessionStorage.getItem("keys");
    return selectedKeys ? selectedKeys : ["1"];
  };

  const defaultSelectedKeys = resetDefaultSelectedKeys();

  const items = [
    getItem("Dashboard", "1", <HomeOutlined />, null, "/user"),
    getItem("Information", "2", <UserAddOutlined />, null),
  ];

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => storeDefaultSelectedKeys([item.key])}
          >
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      }
    });
  };

  DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const handleLogout = () => {
    logout();
    notification.success({
      message: t("Logout Successful"),
      description: t("You have successfully logged out."),
      duration: 2,
    });
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        width={230}
        breakpoint="lg"
        collapsedWidth="55"
        defaultCollapsed
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="scrollbar sider overflow-auto min-h-screen left-0 top-0 bottom-0 box-border z-50 flex-none w-56 overflow-y-auto"
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <div className="flex justify-center my-4">
          <img className="w-2/3 object-cover select-none" src={Logo} alt="" />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          className="select-none"
        >
          {renderMenuItems(items)}
        </Menu>
      </Sider>
      <Layout className="right-bar overflow-y-auto transition-all duration-[280ms] ease-in">
        <div className="header pr-4 flex justify-end gap-2 items-center fixed z-[1000] h-16 backdrop-blur-[5px] bg-[#f5f5f58a] transition-all duration-700 ease-in-out">
          <img
            src={user.picture}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-[50%] border object-cover"
          />

          <div className="flex flex-col">
            {isAuthenticated ? <strong>{user.given_name}</strong> : ""}
            <div
              className="text-[#5099ff] hover:underline cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
        <Content className="mt-[80px] mx-4 ">
          <div className="rounded-xl overflow-x-auto min-w-[250px] bg-[#fff]">
            {children}
          </div>
        </Content>
        <Footer className="text-center">
          Copyright @2024 Baobatluc. All right reserved
        </Footer>
        <FloatButton />
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
