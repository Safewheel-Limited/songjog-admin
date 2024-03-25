import { Button, Input, Space } from "antd";
import Title from "antd/es/typography/Title";
import * as React from "react";
import _ from "lodash";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

import { useModal } from "@/common/store";
import { KeyEnum, MODAL_ENUMS } from "@/common/constants";

interface PropsType {
    setSearch: (prev: any) => void
}

const RoleHeader = ({ setSearch }: PropsType) => {
    const { setModal } = useModal();
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch((prev: any) => {
            return { ...prev, name: e.target.value };
        });
    const debouncedHandler = _.debounce(handleFilter, 1000);

    return (
        <>
            <Title level={3}>Roles</Title>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "20px",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <Space.Compact size="large">
                        <Input
                            key={KeyEnum.ROLE_ACCESS_GET_ALL}
                            addonBefore={<SearchOutlined />}
                            placeholder="Search by role name"
                            onChange={debouncedHandler}
                        />
                    </Space.Compact>
                </div>

                <div>
                    <Button
                        key={KeyEnum.ROLE_ACCESS_CREATE}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setModal(MODAL_ENUMS.ADD_ROLE)}
                    >
                        Add new Role
                    </Button>
                </div>
            </div>
        </>
    );
};

export default RoleHeader;
