"use client";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "./components/Sidebar";
import Contents from "./components/Contents";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    //   const userLoggedIn = isLoggedIn();
    const router = useRouter();
    //   const [isLoading, setIsLoading] = useState<boolean>(false);

    //   useEffect(() => {
    //     if (!userLoggedIn) {
    //       router.push("/login");
    //     }
    //     setIsLoading(true);
    //   }, [router, isLoading]);

    //   if (!isLoading) {
    //     return (
    //       <Row
    //         justify="center"
    //         align="middle"
    //         style={{
    //           height: "100vh",
    //         }}
    //       >
    //         <Space>
    //           <Spin tip="Loading" size="large"></Spin>
    //         </Space>
    //       </Row>
    //     );
    //   }

    return (
        <Layout hasSider>
            <SideBar />
            <Contents>{children}</Contents>
        </Layout>
    );
};

export default DashboardLayout;