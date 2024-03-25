
import { Button, Popconfirm, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMutation } from "@apollo/client";
import { LockOutlined } from "@ant-design/icons";

import { UN_ASSIGN_ROLE_TO_USER } from "../../role/graphql/role.mutation";
import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { UserData } from "../types";
import { useModal } from "@/common/store";

const AdministratorsColumns = () => {

    const { setModal } = useModal();
    const [unAssignRoleToUser] = useMutation(UN_ASSIGN_ROLE_TO_USER, {
        refetchQueries: ["userGetAll"],
    });

    const handleUnAssignRole = (id: string) => {
        unAssignRoleToUser({
            variables: {
                userId: id,
            },
        })
            .then((res) => {
                if (res?.data) {
                    // alert("Remove Role from user!");
                }
            })
            .catch((err) => {
                if (err) {
                    // alert(err.message);
                }
            });
    };

    const columns: ColumnsType<UserData> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Phone no.",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "User type",
            dataIndex: "user_type",
            key: "user_type",
            render: (user_type) => (
                <Tag color={user_type === "basic" ? "blue" : "yellow"}>
                    {user_type.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Current Role",
            dataIndex: "roleAccess",
            key: "roleAccess",
            render: (roleAccess) => <Tag color="gold-inverse">{roleAccess.name}</Tag>,
        },
        {
            title: "Actions",
            dataIndex: "user_type",
            key: "user_type",
            render: (_, data) => (
                // <Permission>
                <Space>
                    <Button
                        key={KeyEnum.USER_UPDATE_PASSWORD}
                        onClick={() => setModal(MODAL_ENUMS.SET_INITIAL_PASSWORD)}
                        icon={<LockOutlined />}
                    >
                        Set Password
                    </Button>
                    <Popconfirm
                        key={`popConfirm-${data.kid}`}
                        title="Are you sure ?"
                        description="Are you sure remove this user role?"
                        onConfirm={() => handleUnAssignRole(data.kid)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            key={KeyEnum.UN_ASSIGN_ROLE_TO_USER}
                            icon={<LockOutlined />}
                            type="dashed"
                            danger
                        >
                            Remove Role
                        </Button>
                    </Popconfirm>
                </Space>
                // </Permission>
            ),
        },
    ];

    return columns;
};

export default AdministratorsColumns;
