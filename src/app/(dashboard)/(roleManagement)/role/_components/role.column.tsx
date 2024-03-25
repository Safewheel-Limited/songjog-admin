import { useMutation } from "@apollo/client";
import { Button, Popconfirm, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { ROLE_ACCESS_DELETE } from "../graphql/role.mutation";
import { useRoleAndPermissionState } from "../../store";
import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useModal } from "@/common/store";

const RoleColumnRenderer = () => {
    const [roleAccessDelete] = useMutation(ROLE_ACCESS_DELETE, {
        refetchQueries: ["roleAccessGetAll"],
    });

    const { setModal } = useModal();
    const { setEditRoleId, setPermissionAccessData } =
        useRoleAndPermissionState();
    const hanndleRoleDelete = (id: string) => {
        roleAccessDelete({
            variables: {
                id: id,
            },
        });
    };

    const handleUpdateRole = (id: string) => {
        setModal(MODAL_ENUMS.EDIT_ROLE);
        setEditRoleId(id);
    };

    const handleViewRolePermissions = (data: any) => {
        setModal(MODAL_ENUMS.ROLE_ACCESS_HOLDER_MODAL);
        setPermissionAccessData(data?.permission);
    };

    const columns = [
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
            title: "createdAt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_: any, data: any) => (
                <p>
                    {new Date(data?.createdAt.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },
        {
            title: "updatedAt",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (_: any, data: any) => (
                <p>
                    {new Date(data?.updatedAt.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },
        {
            title: "Permission Access Holder",
            dataIndex: "permission ",
            key: "permission",
            render: (_: any, data: any) => {
                return (
                    <div style={{ cursor: "pointer" }}>
                        <Tag
                            color="#108ee9"
                            onClick={() => handleViewRolePermissions(data)}
                        >
                            Permission : {data.permission.length}
                        </Tag>
                    </div>
                );
            },
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            width: 120,
            render: (_: any, data: any) => {
                return (
                    //   <Permission>
                    <Space>
                        <Button
                            key={KeyEnum.ROLE_ACCESS_UPDATE}
                            type="primary"
                            icon={<EditOutlined />}
                            style={{ background: "#4682A9" }}
                            onClick={() => handleUpdateRole(data.id)}
                        />
                        <Popconfirm
                            title="Are you sure ?"
                            description="Are you sure to delete this Role"
                            onConfirm={() => hanndleRoleDelete(data.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button key={KeyEnum.ROLE_ACCESS_DELETE} icon={<DeleteOutlined />} danger type="primary" />
                        </Popconfirm>
                    </Space>
                    //   </Permission>
                );
            },
        },
    ];

    return columns;
};

export default RoleColumnRenderer;
