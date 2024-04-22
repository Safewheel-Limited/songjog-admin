/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Flex, message } from 'antd';
import { SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

import { GET_CARE_PACKAGE_TIME, UPDATE_CARE_PACKAGE_TIME } from '../../graphql';
import { CreateCarePackageTimeFormValues } from '../../types';
import { carePackageTimeSchema } from '../../validation';
import DynamicModal from '@/components/ui/DynamicModal'
import FormInput from '@/components/Forms/FormInput';
import { useSavePackageTimeId } from '../_store';
import { MODAL_ENUMS } from '@/common/constants';
import Form from "@/components/Forms/Form";
import { useModal } from '@/common/store'

const PackageTimeUpdateModal = () => {
    const { modal, setModal } = useModal();
    const { packageTimeId } = useSavePackageTimeId();

    const { data } = useQuery(GET_CARE_PACKAGE_TIME, {
        variables: {
            id: Number(packageTimeId)
        }
    });

    const [carePackageTimeUpdate, { loading, error }] = useMutation(UPDATE_CARE_PACKAGE_TIME, {
        refetchQueries: ["carePackageTimeGetAll"]
    });

    const onSubmit: SubmitHandler<CreateCarePackageTimeFormValues> = async (data: any) => {
        try {
            const result = await carePackageTimeUpdate({
                variables: {
                    input: {
                        id: Number(packageTimeId),
                        title: data.title
                    }
                }
            })

            if (result.data) {
                message.success("Package time updated Successful.")
                setModal("");
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

    let defaultValue = {
        title: data?.carePackageTimeGet?.title
    }

    return (
        <DynamicModal
            title="Update package time"
            isOpen={modal === MODAL_ENUMS.UPDATE_CARE_PACKAGE}
            closeModal={() => setModal("")}
            showCancelButton
            footer={<Button onClick={() => setModal("")}>Cancel</Button>}
        >
            <Form submitHandler={onSubmit} resolver={yupResolver(carePackageTimeSchema)} defaultValues={defaultValue}>
                <Flex vertical gap="large">
                    <FormInput
                        name="title"
                        label="Write Title"
                        required
                        placeholder="Enter Your Title"
                        type="text"
                        disabled={loading}
                    />

                    <Button
                        loading={loading}
                        disabled={loading}
                        type="primary"
                        htmlType="submit"

                        block
                    >
                        Update Package Time
                    </Button>
                </Flex>
            </Form>
        </DynamicModal>
    )
}

export default PackageTimeUpdateModal