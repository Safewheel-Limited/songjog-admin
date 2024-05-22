
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, message } from "antd";

import { KeyEnum } from "@/common/constants";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DELETE_BOOKING } from "../graphql";

const BookingColumnRender = () => {
    const router = useRouter();

    const [bookingDelete, { loading }] = useMutation(DELETE_BOOKING, {
        refetchQueries: ["bookingGetAll"],
    });

    const handleBookingDelete = (id: string | number) => {
        bookingDelete({
            variables: {
                id: Number(id)
            }
        }).then(res => {
            if (res.data) {
                message.success("booking deleted Successful")
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
            title: "Care package title",
            dataIndex: "carePackage",
            key: "carePackage",
            render: (_: any, data: any) => {
                return <p>{data?.title}</p>
            }
        },
        {
            title: "Care giver name",
            dataIndex: "careGiver",
            key: "careGiver",
            render: (_: any, data: any) => {
                return <p>{data?.fullName}</p>
            }
        },
        {
            title: "Care giver phone",
            dataIndex: "careGiver",
            key: "careGiver",
            render: (_: any, data: any) => {
                return <p>{data?.phone}</p>
            }
        },
        {
            title: "User name",
            dataIndex: "user",
            key: "user",
            render: (_: any, data: any) => {
                return <p>{data?.fullName}</p>
            }
        },
        {
            title: "User phone",
            dataIndex: "user",
            key: "user",
            render: (_: any, data: any) => {
                return <p>{data?.phone}</p>
            }
        },
        {
            title: "Service Start Date",
            dataIndex: "serviceStartDate",
            key: "serviceStartDate",
            render: (_: any, data: any) => (
                <p>
                    {new Date(data?.serviceStartDate?.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },
        {
            title: "Service End Date",
            dataIndex: "serviceEndDate",
            key: "serviceEndDate",
            render: (_: any, data: any) => (
                <p>
                    {new Date(data?.serviceEndDate?.toString()).toLocaleString(undefined, {
                        hour12: true,
                    })}
                </p>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            // render: (_: any, data: any) => {
            //     return <p>{data?.title}</p>
            // }
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
                            onClick={() => router.push(`/booking/edit-booking/${data.id}`)}
                        />
                        <Popconfirm
                            title="Are you sure ?"
                            description="Are you sure to delete this Role"
                            onConfirm={() => handleBookingDelete(data.id)}
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

export default BookingColumnRender;
