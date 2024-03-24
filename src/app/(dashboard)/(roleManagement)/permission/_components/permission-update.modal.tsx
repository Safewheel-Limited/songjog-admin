import { useEffect, useState } from "react";
import { Button, Flex, Input, Space, message } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PERMISSION } from "../graphql/permission.mutation";
import { GET_PERMISSION_BY_ID } from "../graphql/permission.query";
import DynamicModal from "@/components/ui/DynamicModal";
import { useRoleAndPermissionState } from "../store";
import { MODAL_ENUMS } from "@/common/constants";
import { useModal } from "@/common/store";

const PermissionUpdateModal = () => {
    const [inputValue, setInputValue] = useState("");
    const { modal, setModal } = useModal();
    const { roleId } = useRoleAndPermissionState();
    const [permissionUpdate, { loading }] = useMutation(UPDATE_PERMISSION, {
        refetchQueries: ["permissionGetAll"],
    });

    const { data } = useQuery(GET_PERMISSION_BY_ID, {
        variables: {
            id: roleId,
        },
    });

    useEffect(() => {
        if (data?.permissionGet) {
            setInputValue(data?.permissionGet?.name);
        }
    }, [data]);

    const handleUpdatePermission = () => {
        if (inputValue) {
            permissionUpdate({
                variables: {
                    input: {
                        id: roleId,
                        name: inputValue,
                    },
                },
            }).then((res) => {
                if (res) {
                    setModal("");
                    message.success({
                        content: "Permission successfully Updated",
                        duration: 2.5,
                    });
                }
            });
        } else {
            message.error({
                content: "Permission name is required!",
                duration: 2.5,
            });
        }
    };

    return (
        <>
            <DynamicModal
                title="Update Permission"
                confirmLoading={loading}
                closeModal={() => setModal("")}
                isOpen={modal === MODAL_ENUMS.EDIT_PERMISSION}
                handleOk={() => setModal("")}
                showCancelButton={true}
                showOkButton={true}
                footer={
                    <Flex gap="15px" justify="flex-end">
                        <Button onClick={() => setModal("")} disabled={loading}>Cancel</Button>
                        <Button
                            type="primary"
                            onClick={handleUpdatePermission}
                            loading={loading}
                        >
                            Update
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
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </Space>
            </DynamicModal>
        </>
    );
};

export default PermissionUpdateModal;
