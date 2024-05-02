import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { COURSE_DELETE } from "../graphql";

const CourseColumnRenderer = () => {
  const router = useRouter();

  const [courseDelete, { loading }] = useMutation(COURSE_DELETE, {
    refetchQueries: ["courseGetAll"],
  });

  const handleDeleteCourse = (id: string | number) => {
    courseDelete({
      variables: {
        id: Number(id)
      }
    }).then(res => {
      if (res.data) {
        message.success("Course deleted Successful")
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Course Time",
      dataIndex: "course_time",
      key: "course_time",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (_: any, data: any) => {
        return <p>{data.author.fullName}</p>
      }
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
              // key={KeyEnum.ROLE_ACCESS_UPDATE}
              type="primary"
              icon={<EditOutlined />}
              style={{ background: "#4682A9" }}
              onClick={() => router.push(`/course/edit-course/${data.id}`)}
            />
            <Button
              key={KeyEnum.ROLE_ACCESS_UPDATE}
              type="primary"
              icon={<EyeOutlined />}
              style={{ background: "#4682A9" }}
              onClick={() => router.push(`/course/edit-course/${data.id}`)}
            />
            <Popconfirm
              title="Are you sure ?"
              description="Are you sure to delete this Role"
              onConfirm={() => handleDeleteCourse(data.id)}
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

export default CourseColumnRenderer;
