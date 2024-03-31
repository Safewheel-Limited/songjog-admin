"use client";

import { SubmitHandler } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useMutation } from "@apollo/client";
import Card from "antd/es/card/Card";
import { Button, Flex } from "antd";

import useGetMultipleDataWithDynamicQuery from "../../hooks/useGetMultipleDataWithDynamicQuery.hook";
import { CARE_PACKAGE_TIME_GET_ALL, CREATE_CARE_PACKAGE } from "../../graphql";
import { BasisItems } from "../../_constants/select-basis-item.constant";
import FormSelectField from "@/components/Forms/FormSelectField";
import { convertDataToFormSelectOptions } from "@/common/utils";
import FormTextArea from "@/components/Forms/FormTextArea";
import { CreateCarePackageFormValues } from "../../types";
import FormInput from "@/components/Forms/FormInput";
import Form from "@/components/Forms/Form";

const AddCarePacakge = () => {
    const { data } = useGetMultipleDataWithDynamicQuery({ query: CARE_PACKAGE_TIME_GET_ALL })
    const [carePackageCreate, result] = useMutation(CREATE_CARE_PACKAGE);
    const onSubmit: SubmitHandler<CreateCarePackageFormValues> = async (data: any) => {
        try {
            carePackageCreate({
                variables: {
                    input: data
                }
            })
        } catch (error) {
            // console.log("error", error)
        }
    };

    console.log("data", data);

    return (
        <Card>
            <Title level={3}>Add Care Package</Title>
            <Form submitHandler={onSubmit}>
                <Flex vertical gap="large">
                    <FormInput
                        name="Title"
                        label="Write Title"
                        required
                        placeholder="Enter Your Title"
                        type="text"
                    />
                    <FormTextArea
                        name="description"
                        label="Write Description"
                        placeholder="Write your package description"
                        rows={5}
                    />

                    <FormInput
                        name="level"
                        label="Level"
                        placeholder="Write your level"
                        type="text"
                    />
                    <FormInput
                        name="Price"
                        label="Price"
                        placeholder="Write your Price"
                        type="number"
                        required
                    />
                    <FormSelectField
                        name="basis"
                        options={BasisItems}
                        placeholder="Select Basis"
                        label="Select Basis"
                        required
                    />

                    <FormSelectField
                        name="carePackageTime"
                        options={BasisItems}
                        placeholder="Select Care Package Time"
                        label="Select Care Package Time"
                        required
                    />
                    <Button
                        // loading={loading}
                        // disabled={loading}
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Create Package
                    </Button>
                </Flex>
            </Form>
        </Card>
    );
};

export default AddCarePacakge;
