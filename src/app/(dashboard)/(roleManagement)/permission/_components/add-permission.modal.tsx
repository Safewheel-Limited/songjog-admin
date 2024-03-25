import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Flex, Input, Space, message } from "antd";

import { useModal } from "@/common/store";
import { CREATE_PERMISSION } from "../graphql/permission.mutation";
import { MODAL_ENUMS } from "@/common/constants";
import DynamicModal from "@/components/ui/DynamicModal";

const AddPermissionModal = () => {
    const { modal, setModal } = useModal();
    const [inputValue, setInputValue] = useState("");
    const [permissionCreate, { loading }] = useMutation(CREATE_PERMISSION, {
        refetchQueries: ["permissionGetAll"],
    });

    const handleAddPermission = () => {
        if (inputValue) {
            permissionCreate({
                variables: {
                    input: {
                        name: inputValue,
                    },
                },
            }).then((res) => {
                if (res?.data) {
                    message.success({
                        content: "Permission successfully created!!",
                        duration: 2.5,
                    });
                    setModal("");
                    setInputValue("");
                }
            });
        } else {
            message.error({
                content: "Write permission name!",
                duration: 2.5,
            });
        }
    };

    return (
        <>
            <DynamicModal
                title="Add new permission"
                isOpen={modal === MODAL_ENUMS.ADD_PERMISSION}
                closeModal={() => setModal("")}
                confirmLoading={loading}
                showCancelButton
                footer={
                    <Flex gap="15px" justify="flex-end">
                        <Button onClick={() => setModal("")} disabled={loading}>Cancel</Button>
                        <Button type="primary" onClick={handleAddPermission} loading={loading}>
                            Add
                        </Button>
                    </Flex>
                }
            >
                <Space direction="vertical" style={{ width: "100%" }}>
                    <span>Permission name</span>
                    <Input
                        placeholder="Permission"
                        value={inputValue}
                        disabled={loading}
                        required
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </Space>
            </DynamicModal>
        </>
    );
};

export default AddPermissionModal;
