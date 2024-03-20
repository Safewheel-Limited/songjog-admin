import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { USER_ROLE } from "@/common/constants";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { userLogout } from "@/common/utils";
const { Header: AntHeader } = Layout;

const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        userLogout();
        router.push("/login");
    }

    const items: MenuProps["items"] = [
        {
            key: "0",
            label: (
                <Button type="text" danger onClick={handleLogout}>
                    Logout
                </Button>
            ),
        },
    ];

    const role = USER_ROLE.ADMIN;

    return (
        <AntHeader
            style={{
                background: "#fff",
            }}
        >
            <Row
                justify="end"
                align="middle"
                style={{
                    height: "100%",
                }}
            >
                <p
                    style={{
                        margin: "0px 5px",
                    }}
                >
                    {role}
                </p>
                <Dropdown menu={{ items }}>
                    <Space wrap size={16}>
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Space>
                </Dropdown>
            </Row>
        </AntHeader>
    );
};

export default Header;