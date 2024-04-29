import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useModal } from "@/common/store";
import { DELETE_REVIEW } from "../graphql";
import { useSaveReviewId } from "../store";

const ReviewColumnRenderer = () => {
  const { setReviewId } = useSaveReviewId();
  const { setModal } = useModal();
  const [reviewDelete, { loading }] = useMutation(DELETE_REVIEW, {
    refetchQueries: ["reviewGetAll"],
  });

  const handleDeleteReview = (id: string | number) => {
    reviewDelete({
      variables: {
        id: Number(id),
      },
    })
      .then((res) => {
        if (res.data) {
          message.success("Review deleted Successful");
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleUpdateReview = (id: number | string) => {
    setReviewId(id);
    setModal(MODAL_ENUMS.OPEN_UPDATE_REVIEW_MODAL);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Course Title",
      dataIndex: "course_title",
      key: "course_title",
      render: (_: any, data: any) => {
        return <>{data?.course?.title}</>
      }
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      render: (_: any, data: any) => {
        return <>{data?.rating}</>
      }
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (_: any, data: any) => {
        return <>{data?.comment?.slice(0, 30)} ...</>
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
              key={KeyEnum.ROLE_ACCESS_UPDATE}
              type="primary"
              icon={<EditOutlined />}
              style={{ background: "#4682A9" }}
              onClick={() => handleUpdateReview(data.id)}
            />
            <Popconfirm
              title="Are you sure ?"
              description="Are you sure to delete this Role"
              onConfirm={() => handleDeleteReview(data.id)}
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

export default ReviewColumnRenderer;
