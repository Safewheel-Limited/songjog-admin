"use client";

import { SubmitHandler } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useMutation } from "@apollo/client";
import { Button, Flex, message } from "antd";
import Card from "antd/es/card/Card";

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
    const [carePackageCreate] = useMutation(CREATE_CARE_PACKAGE);
    const onSubmit: SubmitHandler<CreateCarePackageFormValues> = async (data: any) => {
        try {
            data.thumbnails = [1, 2];
            data.price = Number(data.price)
            const res = await carePackageCreate({
                variables: {
                    input: data
                }
            })
            if (res.data) {
                message.success("Care package created successfully")
            }
        } catch (error) {
            message.error("Something want wrong. please try again!")
        }
    };

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
                        name="price"
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
                        mode="multiple"
                        name="carePackageTime"
                        options={convertDataToFormSelectOptions(data?.carePackageTimeGetAll.data)}
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
