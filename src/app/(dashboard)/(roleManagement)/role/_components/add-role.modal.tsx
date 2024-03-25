import {
    Button,
    Checkbox,
    Col,
    Divider,
    Flex,
    Input,
    Row,
    Space,
    Spin,
    message,
} from "antd";
import { useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useModal } from "@/common/store";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_PERMISSION } from "../../permission/graphql/permission.query";
import { ROLE_ACCESS_CREATE } from "../graphql/role.mutation";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import DynamicModal from "@/components/ui/DynamicModal";
import { MODAL_ENUMS } from "@/common/constants";

const AddRoleModal = () => {
    const { modal, setModal } = useModal();
    const [inputValue, setInputValue] = useState("");
    const { data, loading: permissionLoading } = useQuery(GET_ALL_PERMISSION, {
        variables: {
            paginationQuery: {
                limit: 5000
            },
            filterQuery: {},
        },
    });

    const [roleAccessCreate, { loading }] = useMutation(ROLE_ACCESS_CREATE, {
        refetchQueries: ["roleAccessGetAll", "permissionGetAll"],
    });

    const plainOptions = data?.permissionGetAll?.data.map(
        (item: { name: string; id: string }) => {
            return {
                name: item.name,
                id: item.id,
            };
        }
    );
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const checkAll = plainOptions?.length === checkedList?.length;
    const indeterminate =
        checkedList?.length > 0 && checkedList?.length < plainOptions?.length;

    const handleCheckboxGroup = (list: CheckboxValueType[]) => {
        setCheckedList(prev => [...prev, ...list]);
    };
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const filterdList = plainOptions.map((item: { id: string; }) => item.id);
        setCheckedList(e.target.checked ? filterdList : []);
    };

    const handleAddRole = () => {
        if (inputValue) {
            roleAccessCreate({
                variables: {
                    input: {
                        name: inputValue,
                        permissionIds: checkedList,
                    },
                },
            })
                .then((res) => {
                    if (res?.data) {
                        setModal("");
                        setCheckedList([]);
                        setInputValue("");
                        message.success({
                            content: "Role successfully done!",
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
                content: "Please select atleast one role!",
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
                title="Add new permission"
                isOpen={modal === MODAL_ENUMS.ADD_ROLE}
                closeModal={() => setModal("")}
                confirmLoading={loading}
                width={1000}
                showOkButton
                showCancelButton
                handleOk={() => setModal("")}
                footer={
                    <Flex gap="15px" justify="flex-end">
                        <Button onClick={() => setModal("")} disabled={loading}>Cancel</Button>
                        <Button
                            type="primary"
                            onClick={handleAddRole}
                            loading={loading}
                        >
                            Add
                        </Button>
                    </Flex>
                }
            >
                <div>
                    <Space
                        direction="vertical"
                        style={{ width: "100%", marginBottom: "30px" }}
                    >
                        <span>Role Name</span>
                        <Input
                            placeholder="Write your permission name"
                            value={inputValue}
                            required
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </Space>
                    {permissionLoading ? (
                        <Space
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Spin size="small" />
                        </Space>
                    ) : (
                        <Row gutter={16}>
                            <Checkbox
                                indeterminate={indeterminate}
                                onChange={onCheckAllChange}
                                checked={checkAll}
                                disabled={!plainOptions?.length}
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
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    width: "100%",
                                }}
                            >
                            </div>
                        </Row>
                    )}
                </div>
            </DynamicModal>

        </>
    );
};

export default AddRoleModal;
