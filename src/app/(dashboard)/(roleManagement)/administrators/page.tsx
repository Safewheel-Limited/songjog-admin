"use client";

import { Button } from "antd";
import { useState } from "react";
import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";

import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useModal } from "@/common/store";
import DynamicTable from "@/components/ui/DynamicTable";
import AdministratorsColumns from "./_components/administrators.column";
import AddNewAdministratorModal from "./_components/administrators.modal";

type FieldType = {
    password?: string;
};

const Administrators: React.FC = () => {
    const { setModal } = useModal();
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [formData, setFormData] = useState({
        password: "",
        uid: "",
    });

    // const { data, refetch: refetchUsers, loading } = useQuery(GET_ALL_USERS, {
    //     variables: {
    //         paginationQuery: {
    //             limit: limit,
    //             page: page,
    //         },
    //         filterQuery: {
    //             user_type: "administrator",
    //         },
    //     },
    // });


    // useEffect(() => {
    //     refetchUsers();
    // }, [refetchUsers]);


    /*
    *
    *  Set ADMIN Password
    * */

    // const [userUpdatePassword, { loading: userUpdatePasswordLoading, client }
    // ] = useMutation(ADMIN_UPDATE_PASSWORD, {
    //     refetchQueries: ["userGetAll"]
    // })

    // const handleChangePassword = () => {
    //     if (formData.password !== "" && formData.uid !== "") {
    //         userUpdatePassword({
    //             variables: formData
    //         })
    //     }
    // }

    const onPaginationChange = (current: number, pageSize: number) => {
        setPage(current);
        setLimit(pageSize);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <Title level={3}>Administrators</Title>
                <Button
                    key={KeyEnum.USER_UPDATE}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setModal(MODAL_ENUMS.ADD_NEW_ADDMINISTRATOR)}
                >
                    Add New Administrator
                </Button>
            </div>
            <AddNewAdministratorModal />

            <DynamicTable
                key={KeyEnum.USER_GET_ALL}
                columns={AdministratorsColumns()}
                // dataSource={data?.userGetAll?.data}
                // loading={loading}
                dataSource={undefined}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                // totalPages={data?.userGetAll?.pagination?.total}
                pageSize={page}
            />
        </>
    );
};

export default Administrators;
