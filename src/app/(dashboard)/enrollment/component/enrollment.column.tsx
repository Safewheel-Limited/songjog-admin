
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ENROLLMENT_DELETE } from "../graphql";

const EnrollmentColumnRenderer = () => {
  const router = useRouter();

  const [enrollmentDelete, { loading }] = useMutation(ENROLLMENT_DELETE, {
    refetchQueries: ["enrollmentGetAll", "enrollmentGet"],
  });

  const handleDeleteEnrollment = (id: string | number) => {
    enrollmentDelete({
      variables: {
        id: Number(id)
      }
    }).then(res => {
      if (res.data) {
        message.success("enrollment deleted Successful")
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
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      render: (_: any, data: any) => (
        <>
          {data?.user?.fullName}
        </>
      )
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
            <Popconfirm
              title="Are you sure ?"
              description="Are you sure to delete this Role"
              onConfirm={() => handleDeleteEnrollment(data.id)}
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

export default EnrollmentColumnRenderer;
