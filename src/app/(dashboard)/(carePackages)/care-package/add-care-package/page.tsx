"use client";

import { UploadOutlined } from "@ant-design/icons";
import { SubmitHandler } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useMutation } from "@apollo/client";
import { Button, Flex, message } from "antd";
import Card from "antd/es/card/Card";
import Image from "next/image";

import { CARE_PACKAGE_TIME_GET_ALL, CREATE_CARE_PACKAGE } from "../../graphql";
import GalleryModal from "@/app/(dashboard)/gallery/components/gallery.modal";
import { ImageType, useSelectImages } from "@/app/(dashboard)/gallery/store";
import { BasisItems } from "../../_constants/select-basis-item.constant";
import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";
import FormSelectField from "@/components/Forms/FormSelectField";
import { convertDataToFormSelectOptions } from "@/common/utils";
import FormTextArea from "@/components/Forms/FormTextArea";
import { CreateCarePackageFormValues } from "../../types";
import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import { useRouter } from "next/navigation";

const AddCarePacakge = () => {
    const { data } = useGetMultipleDataWithDynamicQuery({
        query: CARE_PACKAGE_TIME_GET_ALL,
    });
    const [carePackageCreate, { loading, error }] = useMutation(CREATE_CARE_PACKAGE, {
        refetchQueries: ["carePackageGetAll"]
    });
    const { selectImages, resetSelectedImages } = useSelectImages();
    const { setModal } = useModal();
    const router = useRouter();
    const onSubmit: SubmitHandler<CreateCarePackageFormValues> = async (
        data: any
    ) => {
        data.thumbnails = selectImages.map(image => image.id);
        data.price = Number(data.price);
        data.level = Number(data.level);

        try {
            const res = await carePackageCreate({
                variables: {
                    input: data,
                },
            });
            if (res.data) {
                message.success("Care package created successfully");
                resetSelectedImages();
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

    return (
        <>
            <Card>
                <Title level={3}>Add Care Package</Title>
                <Form submitHandler={onSubmit}>
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
                                Create Package
                            </Button>
                        </Flex>
                    </Flex>
                </Form>
            </Card>
            <GalleryModal />
        </>
    );
};

export default AddCarePacakge;
