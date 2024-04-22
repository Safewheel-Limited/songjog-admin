import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { DELETE_CARE_PACKAGE_TIME } from "../../graphql";
import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useSavePackageTimeId } from "../_store";
import { useModal } from "@/common/store";

const PackageListsColumnRenderer = () => {

    const [carePackageTimeDelete, { loading }] = useMutation(DELETE_CARE_PACKAGE_TIME, {
        refetchQueries: ["carePackageTimeGetAll"],
    });
    const { setPackageTimeId } = useSavePackageTimeId();
    const { setModal } = useModal();
    const handleDeletePackageTime = (id: string | number) => {
        carePackageTimeDelete({
            variables: {
                input: id
            }
        }).then(res => {
            if (res.data) {
                message.success("Package Time deleted Successful")
            }
        }).catch(err => {
            message.error(err.message);
        })
    }

    const handleUpdatePackageTime = (id: string) => {
        setPackageTimeId(id)
        setModal(MODAL_ENUMS.UPDATE_CARE_PACKAGE)
    }

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "createdAt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_: any, data: any) => (
                <p>
                    {new Date(data?.createdAt?.toString()).toLocaleString(undefined, {
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
                    {new Date(data?.updatedAt?.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            // width: 120,
            render: (_: any, data: any) => {
                return (
                    //   <Permission>
                    <Space>
                        <Button
                            key={KeyEnum.ROLE_ACCESS_UPDATE}
                            type="primary"
                            icon={<EditOutlined />}
                            style={{ background: "#4682A9" }}
                            onClick={() => handleUpdatePackageTime(data.id)}
                        />
                        <Popconfirm
                            title="Are you sure ?"
                            description="Are you sure to delete this Role"
                            onConfirm={() => handleDeletePackageTime(data.id)}
                            okText="Yes"
                            cancelText="No"
                            disabled={loading}
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

export default PackageListsColumnRenderer;
