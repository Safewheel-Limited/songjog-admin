"use client";

import { UploadOutlined } from "@ant-design/icons";
import { SubmitHandler } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useMutation } from "@apollo/client";
import { Button, Flex, message } from "antd";
import Card from "antd/es/card/Card";
import Image from "next/image";

import { CARE_PACKAGE_TIME_GET_ALL, GET_CARE_PACKAGE, UPDATE_CARE_PACKAGE } from "../../../graphql";
import GalleryModal from "@/app/(dashboard)/gallery/components/gallery.modal";
import { ImageType, useSelectImages } from "@/app/(dashboard)/gallery/store";
import { BasisItems } from "../../../_constants/select-basis-item.constant";
import { useGetMultipleDataWithDynamicQuery, useGetSingleDataWithDynamicQuery } from "@/common/hooks";
import FormSelectField from "@/components/Forms/FormSelectField";
import { convertDataToFormSelectOptions } from "@/common/utils";
import FormTextArea from "@/components/Forms/FormTextArea";
import { CreateCarePackageFormValues } from "../../../types";
import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditCarePacakge = ({ params }: { params: { id: string } }) => {
    const [defaultValues, setDefaultValues] = useState({});
    const { selectImages, handleSelectImages, resetSelectedImages } = useSelectImages();
    const { data } = useGetMultipleDataWithDynamicQuery({
        query: CARE_PACKAGE_TIME_GET_ALL,
    });
    const { data: singleCarePackage } = useGetSingleDataWithDynamicQuery({
        query: GET_CARE_PACKAGE,
        variables: {
            id: +params.id
        }
    });

    const [carePackageUpdate, { loading, error }] = useMutation(UPDATE_CARE_PACKAGE, {
        refetchQueries: ["carePackageGetAll", "carePackageGet"]
    })

    useEffect(() => {
        if ((singleCarePackage as any)?.carePackageGet) {
            const { carePackageTime } = singleCarePackage?.carePackageGet || {};
            setDefaultValues(singleCarePackage?.carePackageGet)
            const converTimeOptions = convertDataToFormSelectOptions(carePackageTime)
            setDefaultValues((prev) => ({
                ...prev,
                carePackageTime: converTimeOptions
            }))

            singleCarePackage?.carePackageGet.thumbnails?.forEach((item) => (
                handleSelectImages({ id: item.id, fileUrl: item.fileUrl })
            ))
        }
    }, [singleCarePackage, handleSelectImages])

    const { setModal } = useModal();
    const router = useRouter();

    const onSubmit: SubmitHandler<CreateCarePackageFormValues> = async (
        data: any
    ) => {
        data.thumbnails = selectImages.map(image => image.id);
        data.price = Number(data.price);
        data.level = Number(data.level);
        data.carePackageTime = data.carePackageTime && data.carePackageTime.map((item: any) => item.value)
        delete data.__typename
        console.log("carePackageTime", data)
        try {
            const res = await carePackageUpdate({
                variables: {
                    input: data,
                },
            });
            if (res.data) {
                message.success("Care package updated successfully");
                resetSelectedImages();
                setDefaultValues({})
                router.push("/care-package/care-package-lists")
            }
        } catch (err) {
            message.error(error?.message || "Something want wrong. please try again!");
        }
    };

    const showSelectedImage = (
        <Flex justify="flex-start" align="center" wrap="wrap" gap={5}>
            {selectImages.length > 0 &&
                selectImages.map((image: ImageType) => (
                    <Image
                        src={image.fileUrl}
                        alt="image"
                        width={100}
                        height={100}
                        placeholder="blur"
                        blurDataURL="https://via.placeholder.com/150x150"
                        loading="lazy"
                        objectFit="cover"
                        objectPosition="top center"
                        key={image.id}
                        style={{
                            borderRadius: "10px"
                        }}
                    />
                ))}
        </Flex>
    );

    const handleSelect = (_: any, option: any) => {

        // setDefaultValues((prev) => ({
        //     ...prev,
        //     carePackageTime: [...prev.carePackageTime, option]
        // }))
        console.log("option", option);
    }


    return (
        <>
            <Card>
                <Title level={3}>Update Care Package</Title>
                <Form defaultValues={defaultValues} submitHandler={onSubmit} >
                    <Flex gap="large" style={{ width: "100%" }} justify="space-between">
                        <Flex vertical gap="large" style={{ flexBasis: "50%" }}>
                            <FormInput
                                name="title"
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
                                type="number"
                            />
                        </Flex>
                        <Flex vertical gap="large" style={{ flexBasis: "50%" }}>
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
                                options={convertDataToFormSelectOptions(
                                    data?.carePackageTimeGetAll.data
                                )}
                                placeholder="Select Care Package Time"
                                label="Select Care Package Time"
                                required
                                // defaultValue={defaultValues?.carePackageTime}
                                onSelect={(_, option: any) => handleSelect(_, option)}

                            />
                            {showSelectedImage}
                            <Button
                                type="default"
                                icon={<UploadOutlined />}
                                onClick={() => setModal(MODAL_ENUMS.OPEN_GALLERY_MODAL)}
                            >
                                Select Image
                            </Button>
                            <Button
                                loading={loading}
                                disabled={loading}
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                Update Care Package
                            </Button>
                        </Flex>
                    </Flex>
                </Form>
            </Card>
            <GalleryModal />
        </>
    );
};

export default EditCarePacakge;
