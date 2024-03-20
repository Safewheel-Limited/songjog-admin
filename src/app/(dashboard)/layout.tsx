"use client";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "./components/Sidebar";
import Contents from "./components/Contents";
import { isLoggedIn } from "@/common/services";
import Loader from "@/components/ui/Loader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const userLoggedIn = isLoggedIn();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!userLoggedIn) {
            router.push("/login");
        }
        setIsLoading(true);
    }, [router, isLoading, userLoggedIn]);

    if (!isLoading) {
        return <Loader />
    }

    return (
        <Layout hasSider>
            <SideBar />
            <Contents>{children}</Contents>
        </Layout>
    );
};

export default DashboardLayout;