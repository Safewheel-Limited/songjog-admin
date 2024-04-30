import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useSaveBlogCategoryId } from "../store";
import { useModal } from "@/common/store";
import { DELETE_BLOG_CATEGORY } from "../graphql";

const BlogCategoryColumnRender = () => {
  const { setBlogCategoryId } = useSaveBlogCategoryId();
  const { setModal } = useModal();
  const [blogCategoryDelete, { loading }] = useMutation(DELETE_BLOG_CATEGORY, {
    refetchQueries: ["blogCategoryGetAll"],
  });

  const handleDeleteBlogCategory = (id: string | number) => {
    blogCategoryDelete({
      variables: {
        id: Number(id),
      },
    })
      .then((res) => {
        if (res.data) {
          message.success("Blog Category deleted Successful");
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleUpdateBlogCategory = (id: number | string) => {
    setBlogCategoryId(id);
    setModal(MODAL_ENUMS.OPEN_UPDATE_BLOG_CATEGORY_MODAL);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Title",
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
              onClick={() => handleUpdateBlogCategory(data.id)}
            />
            <Popconfirm
              title="Are you sure ?"
              description="Are you sure to delete this Role"
              onConfirm={() => handleDeleteBlogCategory(data.id)}
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

export default BlogCategoryColumnRender;
