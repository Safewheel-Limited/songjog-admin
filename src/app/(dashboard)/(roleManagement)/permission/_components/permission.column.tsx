"use client";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tag, message } from "antd";
import { useMutation } from "@apollo/client";
import { ColumnsType } from "antd/es/table";

import { DELETE_PERMISSION } from "../graphql/permission.mutation";
import { PermissionType } from "../interface/permission.interface";
import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useRoleAndPermissionState } from "../store";
import { useModal } from "@/common/store";

const ColumnRenderer = () => {

    const [permissionDelete] = useMutation(DELETE_PERMISSION, {
        refetchQueries: ["permissionGetAll"],
    });

    const { setModal } = useModal();
    const { setRoleId, setRoleAccessData } = useRoleAndPermissionState();

    const handleUpdate = (id: string) => {
        setModal(MODAL_ENUMS.EDIT_PERMISSION);
        setRoleId(id);
    };

    const handlePermissionAccessHolderModal = (
        role: {
            name: string;
            id: number;
        }[]
    ) => {
        if (role.length) {
            setModal(MODAL_ENUMS.PERMISSION_ACCESS_HOLDER_MODAL);
            setRoleAccessData(role);
        } else {
            message.warning("No permission assign inside this role");
        }
    };

    const handleDeletePermission = (id: string) => {
        permissionDelete({
            variables: {
                id: id,
            },
        });
    };

    const columns: ColumnsType<PermissionType> = [
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
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_, data) => (
                <p>
                    {new Date(data?.createdAt.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (_, data) => (
                <p>
                    {new Date(data?.updatedAt.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },
        {
            title: "Permission Access Holder",
            dataIndex: "roleAccess",
            key: "roleAccess",
            width: 200,
            render: (_, data) => {
                return (
                    <div style={{ cursor: "pointer" }} >
                        <Tag
                            color="#108ee9"
                            onClick={() => handlePermissionAccessHolderModal(data.role)}
                        >
                            Roles : {data.role.length}
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
            render: (_, data) => {
                return (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                            key={KeyEnum.PERMISSION_UPDATE}
                            type="primary"
                            icon={<EditOutlined />}
                            style={{ background: "#4682A9" }}
                            onClick={() => handleUpdate(data.id)}
                        />
                        <Popconfirm
                            title="Are you sure ?"
                            description="Are you sure to delete this Permission"
                            onConfirm={() => handleDeletePermission(data.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                key={KeyEnum.PERMISSION_DELETE}
                                icon={<DeleteOutlined />}
                                danger
                                type="primary"
                            />
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    return columns;
};

export default ColumnRenderer;
