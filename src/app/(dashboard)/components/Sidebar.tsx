"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";

import { USER_ROLE } from "@/common/constants";
import { sidebarItems } from "./sidebarItems";

const { Sider } = Layout;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const role = USER_ROLE.ADMIN;
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={280}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <div
                style={{
                    color: "white",
                    fontSize: collapsed ? "1rem" : "2rem",
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: ".5rem",
                    padding: "10px 0px",
                    textTransform: "uppercase"
                }}
            >
                Care Giver
            </div>
            <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={sidebarItems(role)}
            />
        </Sider>
    );
};

export default SideBar;