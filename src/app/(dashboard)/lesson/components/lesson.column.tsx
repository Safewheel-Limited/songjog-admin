import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { DELETE_LESSON } from "../graphql/lesson.mutation";
import { useSaveLessonId } from "../store";
import { useModal } from "@/common/store";

const LessonColumnRender = () => {
  const { setLessonId } = useSaveLessonId();
  const { setModal } = useModal();
  const [deleteLesson, { loading }] = useMutation(DELETE_LESSON, {
    refetchQueries: ["lessonGetAll"],
  });

  const handleDeleteLesson = (id: string | number) => {
    deleteLesson({
      variables: {
        id: Number(id),
      },
    })
      .then((res) => {
        if (res.data) {
          message.success("Lesson deleted Successful");
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleUpdateLesson = (id: number | string) => {
    setLessonId(id);
    setModal(MODAL_ENUMS.OPEN_UPDATE_LESSON_MODAL);
  };
  
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "lesson_title",
      key: "lesson_title",
    },
    {
      title: "Time",
      dataIndex: "lesson_time",
      key: "lesson_time",
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
              onClick={() => handleUpdateLesson(data.id)}
            />
            <Popconfirm
              title="Are you sure ?"
              description="Are you sure to delete this Role"
              onConfirm={() => handleDeleteLesson(data.id)}
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

export default LessonColumnRender;
