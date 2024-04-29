"use client";

import { UploadOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Flex, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

import FormInput from "@/components/Forms/FormInput";
import Form from "@/components/Forms/Form";
import { CREATE_LEVEL } from "../graphql";
import { useModal } from "@/common/store";
import { ImageType, useSelectImages } from "../../gallery/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MODAL_ENUMS } from "@/common/constants";
import GalleryModal from "../../gallery/components/gallery.modal";
import { levelSchema } from "../validation";

const CreateLevel = () => {
    const { selectImages, resetSelectedImages } = useSelectImages();
    const { setModal } = useModal();
    const router = useRouter();
    const [levelCreate, { loading }] = useMutation(CREATE_LEVEL, {
        refetchQueries: ["levelGetAll"]
    });

    useEffect(() => {
        resetSelectedImages();
    }, [])

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        data.galleryId = Number(selectImages.map((item) => item.id).pop());
        try {
            const result = await levelCreate({
                variables: {
                    input: data
                }
            })

            if (result.data) {
                resetSelectedImages();
                message.success("Level created Successfully.")
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
            <Title level={3}>Create New Level</Title>
            <Form submitHandler={onSubmit} resolver={yupResolver(levelSchema)}>
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
                        Create New Level
                    </Button>
                </Flex>
            </Form>
            <GalleryModal isSingleSelect={true} />
        </Card>
    );
};

export default CreateLevel;

