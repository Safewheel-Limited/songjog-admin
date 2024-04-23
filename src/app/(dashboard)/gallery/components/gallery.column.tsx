import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, message } from "antd";

import { KeyEnum, MODAL_ENUMS } from "@/common/constants";

const GalleryColumnRender = () => {
  // const { setPackageTimeId } = useSavePackageTimeId();
  // const { setModal } = useModal();
  // const handleDeletePackageTime = (id: string | number) => {
  //     carePackageTimeDelete({
  //         variables: {
  //             input: id
  //         }
  //     }).then(res => {
  //         if (res.data) {
  //             message.success("Package Time deleted Successful")
  //         }
  //     }).catch(err => {
  //         message.error(err.message);
  //     })
  // }

  // const handleUpdatePackageTime = (id: string) => {
  //     setPackageTimeId(id)
  //     setModal(MODAL_ENUMS.UPDATE_CARE_PACKAGE)
  // }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "fileUrl",
      key: "fileUrl",
      render: (_: any, data: any) => (
        <Image
          width={50}
          alt={data.title}
          src={data.fileUrl}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
              // onConfirm={() => handleDeletePackageTime(data.id)}
              okText="Yes"
              cancelText="No"
            // disabled={loading}
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

export default GalleryColumnRender;
