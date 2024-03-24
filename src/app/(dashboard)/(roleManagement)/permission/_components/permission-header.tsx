import { Button, Input, Space } from "antd";
import Title from "antd/es/typography/Title";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { KeyEnum, MODAL_ENUMS } from "@/common/constants";
import { useModal } from "@/common/store";
import _ from "lodash";
import { searchPermisionType } from "../types";

interface PropsType {
    setSearch: (prev: searchPermisionType) => void
}
const PermissionHeader = ({ setSearch }: PropsType) => {

    const { setModal } = useModal();

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch((prev: searchPermisionType) => {
            return { ...prev, name: e.target.value };
        });
    const debouncedHandler = _.debounce(handleFilter, 1000);

    return (
        <>
            <Title level={3}>Permission</Title>
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
                            key={KeyEnum.PERMISSION_GET_ALL}
                            addonBefore={<SearchOutlined />}
                            placeholder="Search by permission name"
                            onChange={debouncedHandler}
                        />
                    </Space.Compact>
                </div>

                <div>
                    <Button
                        key={KeyEnum.PERMISSION_CREATE}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setModal(MODAL_ENUMS.ADD_PERMISSION)}
                    >
                        Add new permission
                    </Button>
                </div>
            </div>
        </>
    );
};

export default PermissionHeader;
