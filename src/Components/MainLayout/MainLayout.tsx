import React, { ReactElement, useState } from "react";

import { Layout } from "antd";
import { PageHeader, SideNav } from "..";
import { useIsMobile } from "../../Hooks/useIsMobile";
import "./styles.scss";

const { Content } = Layout;

type Props = {
  children: ReactElement;
};

export const MainLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const isMobile = useIsMobile();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="main-layout">
      <SideNav
        collapsed={isMobile && collapsed}
        toggleCollapse={toggleCollapse}
      />
      <Layout>
        {!collapsed ? (
          <span className="overlay" onClick={toggleCollapse}></span>
        ) : null}
        <PageHeader handleCollapse={toggleCollapse} />
        <Content className="content-container">{children}</Content>
      </Layout>
    </Layout>
  );
};
