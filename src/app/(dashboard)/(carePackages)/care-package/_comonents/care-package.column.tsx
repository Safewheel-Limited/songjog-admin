import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { CARE_PACKAGE_DELETE } from "../../graphql";
import { KeyEnum } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const CarePackageColumnRenderer = () => {
    const router = useRouter();

    const [carePackageDelete, { loading }] = useMutation(CARE_PACKAGE_DELETE, {
        refetchQueries: ["carePackageGetAll"],
    });

    const handleDeleteCarePackage = (id: string | number) => {
        carePackageDelete({
            variables: {
                id: Number(id)
            }
        }).then(res => {
            if (res.data) {
                message.success("Care package deleted Successful")
            }
        }).catch(err => {
            message.error(err.message);
        })
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
                            onClick={() => router.push(`/care-package/edit-care-package/${data.id}`)}
                        />
                        <Popconfirm
                            title="Are you sure ?"
                            description="Are you sure to delete this Role"
                            onConfirm={() => handleDeleteCarePackage(data.id)}
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

export default CarePackageColumnRenderer;
