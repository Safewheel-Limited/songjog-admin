import { Button, Input, Modal, Space, Table } from "antd";
import { useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useModal } from "@/common/store";
import { MODAL_ENUMS } from "@/common/constants";
import DynamicTable from "@/components/ui/DynamicTable";
import DynamicModal from "@/components/ui/DynamicModal";

const AddNewAdministratorModal = () => {

    const { modal, setModal } = useModal();
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>("");

    // const { data } = useQuery(GET_ALL_USERS, {
    //     variables: {
    //         paginationQuery: {
    //             limit: limit,
    //             page: page,
    //         },
    //         filterQuery: {
    //             phone: search.trim(),
    //             user_type: "basic",
    //         },
    //     },
    // });

    const onPaginationChange = (current: number, pageSize: number) => {
        setPage(current);
        setLimit(pageSize);
    };

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    const debouncedHandler = _.debounce(handleFilter, 1000);

    return (
        <>
            <DynamicModal
                title="Add New Administrator"
                isOpen={modal === MODAL_ENUMS.ADD_NEW_ADDMINISTRATOR}
                closeModal={() => setModal("")}
                width={1000}
                showCancelButton
                footer={<Button onClick={() => setModal("")}>Cancel</Button>}
            >
                <>
                    <div style={{ marginBottom: "20px" }}>
                        <Space.Compact size="large">
                            <Input
                                addonBefore={<SearchOutlined />}
                                onChange={debouncedHandler}
                                placeholder="Search by number"
                            />
                        </Space.Compact>
                    </div>
                    <DynamicTable
                        columns={undefined}
                        // columns={ColumnRenderer()}
                        // dataSource={data?.permissionGetAll?.data}
                        // loading={loading}
                        showSizeChanger={true}
                        dataSource={undefined}
                        onPaginationChange={onPaginationChange}
                        showPagination={true}
                        // totalPages={data?.userGetAll?.pagination?.total}
                        pageSize={page}
                    />
                </>
            </DynamicModal>
        </>
    );
};

export default AddNewAdministratorModal;
