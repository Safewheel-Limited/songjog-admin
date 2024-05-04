import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { DELETE_LESSON_ITEM } from "../graphql";
import { useRouter } from "next/navigation";
import { useModal } from "@/common/store";
import { useSaveLessonItemId } from "../store";

const LessonItemColumnRender = () => {
  const { setModal } = useModal();
  const { setLessonItemId } = useSaveLessonItemId();
  const [deleteLessonItem, { loading }] = useMutation(DELETE_LESSON_ITEM, {
    refetchQueries: ["lessonItemGetAll"],
  });
  const router = useRouter();
  const handleDeleteLessonItem = (id: string | number) => {
    deleteLessonItem({
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

  const handleUpdateLessonItem = (id: number | string) => {
    router.push(`/lesson-items/update-lesson-item/${id}`)
  };

  const handleViewLessonItem = (id: number | string) => {
    setLessonItemId(+id);
    setModal(MODAL_ENUMS.OPEN_LESSON_ITEM_VIEW_MODAL)
  };

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
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, data: any) => (
        <p>{new Date(data?.createdAt?.toString()).toLocaleDateString(undefined)}</p>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      // width: 120,
      render: (_: any, data: any) => {
        return (
          //<Permission>
          <Space>
            <Button
              key={KeyEnum.ROLE_ACCESS_UPDATE}
              type="primary"
              icon={<EditOutlined />}
              style={{ background: "#4682A9" }}
              onClick={() => handleUpdateLessonItem(data.id)}
            />
            <Button
              //  key={"KeyEnum"}
              type="primary"
              icon={<EyeOutlined />}
              style={{ background: "#4682A9" }}
              onClick={() => handleViewLessonItem(data.id)}
            />
            <Popconfirm
              title="Are you sure ?"
              description="Are you sure to delete this Role"
              onConfirm={() => handleDeleteLessonItem(data.id)}
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

export default LessonItemColumnRender;
