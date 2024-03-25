import { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Col,
    Divider,
    Flex,
    Input,
    Row,
    Space,
    message,
} from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";

import { useRoleAndPermissionState } from "../../store";
import { GET_ALL_PERMISSION } from "../../permission/graphql/permission.query";
import { ROLE_ACCESS_GET_BY_ID } from "../graphql/role.query";
import { ROLE_ACCESS_UPDATE } from "../graphql/role.mutation";
import { MODAL_ENUMS } from "@/common/constants";
import { useModal } from "@/common/store";
import DynamicModal from "@/components/ui/DynamicModal";

const EditRoleModal = () => {
    const { modal, setModal } = useModal();
    const { editRoleId } = useRoleAndPermissionState();
    const [inputValue, setInputValue] = useState("");
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

    const { data } = useQuery(GET_ALL_PERMISSION, {
        variables: {
            paginationQuery: {
                limit: 5000
            },
            filterQuery: {},
        },
    });

    const { data: { roleAccessGet } = {} } = useQuery(ROLE_ACCESS_GET_BY_ID, {
        variables: {
            id: editRoleId,
        },
    });

    const [roleAccessUpdate, { loading }] = useMutation(ROLE_ACCESS_UPDATE, {
        refetchQueries: [
            "roleAccessGetAll",
            "permissionGetAll",
        ],
    });

    const plainOptions = data?.permissionGetAll?.data.map(
        (item: { name: string; id: string }) => {
            return {
                name: item.name,
                id: item.id,
            };
        }
    );

    useEffect(() => {
        if (roleAccessGet) {
            const filterdList = roleAccessGet?.permission.map((item: { id: string; }) => item.id);
            setCheckedList(filterdList);
            setInputValue(roleAccessGet?.name);
        }
    }, [roleAccessGet]);

    const checkAll = plainOptions?.length === checkedList?.length;
    const indeterminate =
        checkedList?.length > 0 && checkedList?.length < plainOptions?.length;

    const handleCheckboxGroup = (list: CheckboxValueType[]) => {
        setCheckedList(list);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const filterdList = plainOptions.map((item: { id: string; }) => item.id);
        setCheckedList(e.target.checked ? filterdList : []);
    };

    const handleUpdateRole = () => {
        if (inputValue) {
            roleAccessUpdate({
                variables: {
                    input: {
                        id: editRoleId,
                        name: inputValue,
                        permissionIds: checkedList,
                    },
                },
            })
                .then((res) => {
                    if (res?.data) {
                        setModal("");
                        message.success({
                            content: "Role successfully Updated!",
                            duration: 2.5,
                        });
                    }
                })
                .catch((err) => {
                    message.error({
                        content: err.message,
                        duration: 2.5,
                    });
                });
        } else if (!(checkedList.length > 0)) {
            message.error({
                type: "error",
                content: "Please select any role!",
                duration: 2.5,
            });
        } else {
            message.error({
                content: "Enter Role name!",
                duration: 2.5,
            });
        }
    };

    return (
        <>
            <DynamicModal
                title="Update Role"
                isOpen={modal === MODAL_ENUMS.EDIT_ROLE}
                closeModal={() => setModal("")}
                confirmLoading={loading}
                showCancelButton
                width={1000}
                footer={
                    <Flex gap="15px" justify="flex-end">
                        <Button onClick={() => setModal("")}>Cancel</Button>
                        <Button type="primary" onClick={handleUpdateRole} loading={loading}>
                            Update Role
                        </Button>
                    </Flex>
                }
            >
                <>
                    <Space
                        direction="vertical"
                        style={{ width: "100%", marginBottom: "30px" }}
                    >
                        <span>Role Name</span>
                        <Input
                            placeholder="Permission"
                            value={inputValue}
                            required
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </Space>
                    <Row gutter={16}>
                        <Checkbox
                            indeterminate={indeterminate}
                            onChange={onCheckAllChange}
                            checked={checkAll}
                        >
                            Select all
                        </Checkbox>
                        <Divider style={{ margin: "20px" }} />
                        <Checkbox.Group
                            style={{ width: "100%" }}
                            onChange={handleCheckboxGroup}
                            value={checkedList}
                        >
                            <Row gutter={20}>
                                {plainOptions &&
                                    plainOptions?.map((item: { name: string; id: string }) => (
                                        <Col span={6} style={{ marginBlock: "10px" }} key={item.id}>
                                            <Checkbox value={item.id}>{item.name}</Checkbox>
                                        </Col>
                                    ))}
                            </Row>
                        </Checkbox.Group>
                    </Row>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                        }}
                    >
                    </div>
                </>
            </DynamicModal>
        </>
    );
};

export default EditRoleModal;
