
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DELETE_BLOG } from "../graphql";
import { MdDeleteOutline } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";


const BlogColumnRender = () => {
    const router = useRouter();

    const [blogDelete, { loading }] = useMutation(DELETE_BLOG, {
        refetchQueries: ["blogGetAll"],
    });

    const handleBlogDelete = (id: string | number) => {
        blogDelete({
            variables: {
                id: Number(id)
            }
        }).then(res => {
            if (res.data) {
                message.success("blog deleted Successful")
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
            title: "Read Time",
            dataIndex: "readTime",
            key: "readTime",
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
                            key={KeyEnum.ROLE_ACCESS_VIEW_ALL}
                            type="primary"
                            icon={<RiExternalLinkLine size={18} />}
                            style={{ background: "#49beb7" }}
                            onClick={() => router.push(`/blog/view/${data.id}`)}
                        />
                        <Button
                            key={KeyEnum.ROLE_ACCESS_UPDATE}
                            type="primary"
                            icon={<FaRegEdit size={18} />}
                            style={{ background: "#4682A9", paddingLeft: "4px" }}
                            onClick={() => router.push(`/blog/edit/${data.id}`)}
                        />
                        <Popconfirm
                            title="Are you sure ?"
                            description="Are you sure to delete this Role"
                            onConfirm={() => handleBlogDelete(data.id)}
                            okText="Yes"
                            cancelText="No"
                            disabled={loading}
                        >
                            <Button key={KeyEnum.ROLE_ACCESS_DELETE} icon={<MdDeleteOutline size={22} />} danger type="primary" />
                        </Popconfirm>
                    </Space>
                    //   </Permission>
                );
            },
        },

    ];

    return columns;
};

export default BlogColumnRender;
