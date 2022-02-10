import React, { ReactElement } from "react";
import { Menu, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import { PAGE_URL_POSTS, PAGE_URL_USERS } from "../../Utils/constants";
import "./styles.scss";

const { Sider } = Layout;

type Props = {
  collapsed: boolean;
  toggleCollapse: () => void;
};

type NavOption = {
  key: string;
  title: string;
  icon: ReactElement;
  link: string;
};

const navOptions: NavOption[] = [
  {
    key: "1",
    title: "Posts",
    icon: (
      <img src="icon_activity.png" alt="posts icon" className="menu-icon" />
    ),
    link: PAGE_URL_POSTS,
  },
  {
    key: "2",
    title: "Users",
    icon: (
      <img src="icon_contacts.png" alt="users icon" className="menu-icon" />
    ),
    link: PAGE_URL_USERS,
  },
];

export const SideNav = ({ collapsed, toggleCollapse }: Props) => {
  const location = useLocation();
  const selectedKey = navOptions.find(
    (option) => option.link === location.pathname
  )?.key;

  return (
    <Sider
      className="side-nav"
      collapsed={collapsed}
      collapsedWidth="0"
      width={242}
    >
      <div className="logo-container">
        <img src="LGG-logo.png" alt="Logo" />
      </div>
      <Menu
        mode="vertical"
        className="menu"
        selectedKeys={selectedKey ? [selectedKey] : undefined}
      >
        {navOptions.map(({ key, title, icon, link }) => (
          <Menu.Item
            key={key}
            title=""
            icon={icon}
            className="menu-item"
            onClick={() => {
              toggleCollapse();
            }}
          >
            <Link to={link}>{title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
