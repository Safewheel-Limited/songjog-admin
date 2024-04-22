"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Flex, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

import { CreateCarePackageTimeFormValues } from "../../types";
import { CREATE_CARE_PACKAGE_TIME } from "../../graphql";
import { carePackageTimeSchema } from "../../validation";
import FormInput from "@/components/Forms/FormInput";
import Form from "@/components/Forms/Form";

const CreateCarePackageTime = () => {
    const [carePackageTimeCreate, { loading, error }] = useMutation(CREATE_CARE_PACKAGE_TIME);
    const onSubmit: SubmitHandler<CreateCarePackageTimeFormValues> = async (data: any) => {
        try {
            const result = await carePackageTimeCreate({
                variables: {
                    input: data
                }
            })

            if (result.data) {
                message.success("Package time created Successfully.")
            }

        } catch (err) {
            // console.log(err)
        }
    };

    useEffect(() => {
        if (error) {
            message.error(error.message);
        }
    }, [error])

    return (
        <Card>
            <Title level={3}>Create Care Package Time</Title>
            <Form submitHandler={onSubmit} resolver={yupResolver(carePackageTimeSchema)}>
                <Flex vertical gap="large">
                    <FormInput
                        name="title"
                        label="Write Title"
                        required
                        placeholder="Enter Your Title"
                        type="text"
                    />

                    <Button
                        loading={loading}
                        disabled={loading}
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Create Package Time
                    </Button>
                </Flex>
            </Form>
        </Card>
    );
};

export default CreateCarePackageTime;

