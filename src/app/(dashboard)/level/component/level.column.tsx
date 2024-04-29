import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useModal } from "@/common/store";
import { DELETE_LEVEL } from "../graphql";
import { useRouter } from "next/navigation";

const LevelColumnRender = () => {
    const router = useRouter();
    const [levelDelete, { loading }] = useMutation(DELETE_LEVEL, {
        refetchQueries: ["levelGetAll"],
    });

    const handleDeleteLevel = (id: string | number) => {
        levelDelete({
            variables: {
                id: Number(id),
            },
        })
            .then((res) => {
                if (res.data) {
                    message.success("Level deleted Successful");
                }
            })
            .catch((err) => {
                message.error(err.message);
            });
    };


    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            dataIndex: "levelTitle",
            key: "levelTitle",
        },
        {
            title: "createdAt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (_: any, data: any) => {
                return (
                    <>
                        {new Date(data?.createdAt?.toString()).toLocaleString(undefined, {
                            hour12: true,
                        })}
                    </>
                )
            },
        },
        {
            title: "updatedAt",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (_: any, data: any) => (
                <>
                    {new Date(data?.updatedAt?.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </>
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
                            onClick={() => router.push(`/level/edit-level/${data.id}`)}
                        />
                        <Popconfirm
                            title="Are you sure ?"
                            description="Are you sure to delete this Role"
                            onConfirm={() => handleDeleteLevel(data.id)}
                            okText="Yes"
                            cancelText="No"
                            disabled={loading}
                        >
                            <Button
                                key={KeyEnum.ROLE_ACCESS_DELETE}
                                icon={<DeleteOutlined />}
                                danger
                                type="primary"
                            />
                        </Popconfirm>
                    </Space>
                    //   </Permission>
                );
            },
        },
    ];

    return columns;
};

export default LevelColumnRender;
