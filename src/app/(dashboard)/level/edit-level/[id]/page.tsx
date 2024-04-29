"use client";

import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Flex, Select, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import FormInput from "@/components/Forms/FormInput";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MODAL_ENUMS } from "@/common/constants";
import { ImageType, useSelectImages } from "@/app/(dashboard)/gallery/store";
import { GET_LEVEL, UPDATE_LEVEL } from "../../graphql";
import { useGetMultipleDataWithDynamicQuery, useGetSingleDataWithDynamicQuery } from "@/common/hooks";
import GalleryModal from "@/app/(dashboard)/gallery/components/gallery.modal";
import { GALLERY_GET_ALL } from "@/app/(dashboard)/gallery/graphql/gallery.query";
import { levelSchema } from "../../validation";

const EditLevel = ({ params }: { params: { id: string } }) => {
    const { data: galleryImages } = useGetMultipleDataWithDynamicQuery({ query: GALLERY_GET_ALL });
    const { data: singleLevel } = useGetSingleDataWithDynamicQuery({
        query: GET_LEVEL,
        variables: {
            id: +params.id
        }
    });

    const { selectImages, resetSelectedImages, handleSelectImages } = useSelectImages();
    const { setModal } = useModal();
    const [defaultValues, setDefaultValues] = useState<any>({});
    const router = useRouter();
    const [levelUpdate, { loading }] = useMutation(UPDATE_LEVEL, {
        refetchQueries: ["levelGetAll", "levelGet"]
    });


    useEffect(() => {
        resetSelectedImages();
    }, [])

    useEffect(() => {
        if ((singleLevel as any)?.levelGet) {
            const { levelTitle, galleryId } = (singleLevel as any)?.levelGet;
            setDefaultValues({ levelTitle });
            const defaultImage = (galleryImages as any)?.galleryGetAll?.data.find((image: any) => image.id == galleryId);
            handleSelectImages({ id: defaultImage?.id, fileUrl: defaultImage?.fileUrl })
        }
    }, [singleLevel, handleSelectImages, galleryImages])

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        data.galleryId = Number(selectImages.map((item) => item.id).pop());
        data.id = +params.id;
        try {
            const result = await levelUpdate({
                variables: {
                    input: data
                }
            })

            if (result.data) {
                resetSelectedImages();
                message.success("Level updated Successfully.")
                router.push("/level");
            }

        } catch (err) {
            message.error("something is wrong");
        }
    };

    const showSelectedImage = (
        <Flex justify="flex-start" align="center" wrap="wrap" gap={5}>
            {selectImages.length > 0 &&
                selectImages.map((image: ImageType) => (
                    <>
                        {/* <CloseOutlined /> */}
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
                                borderRadius: "10px",
                                cursor: "pointer"
                            }}
                        />
                    </>
                ))}
        </Flex>
    );

    return (
        <Card style={{ marginInline: "150px" }}>
            <Title level={3}>Update Level</Title>
            <Form submitHandler={onSubmit} defaultValues={defaultValues} resolver={yupResolver(levelSchema)}>
                <Flex vertical gap="large">
                    <FormInput
                        name="levelTitle"
                        label="Write Title"
                        required
                        placeholder="Enter Your Title"
                        type="text"
                    />

                    {showSelectedImage}
                    <Button
                        type="default"
                        // disabled={ }
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
                        Update Level
                    </Button>
                </Flex>
            </Form>
            <GalleryModal isSingleSelect={true} />
        </Card>
    );
};

export default EditLevel;

