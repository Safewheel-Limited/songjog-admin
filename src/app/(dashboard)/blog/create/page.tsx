"use client";

import { UploadOutlined } from "@ant-design/icons";
import { SubmitHandler } from "react-hook-form";
import Title from "antd/es/typography/Title";
import { useMutation } from "@apollo/client";
import { Button, Flex, message } from "antd";
import Card from "antd/es/card/Card";
import Image from "next/image";

import GalleryModal from "@/app/(dashboard)/gallery/components/gallery.modal";
import { ImageType, useSelectImages } from "@/app/(dashboard)/gallery/store";

import FormTextArea from "@/components/Forms/FormTextArea";

import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";

import { useModal } from "@/common/store";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_BLOG } from "../graphql";
import { BlogInputSchema } from "../validation";
import BlogCategoryField from "../components/BlogCategoryIdField";
import FormCheckbox from "@/components/Forms/FormCheckBox";
import Form from "@/components/Forms/Form";
import { useEffect, useState } from "react";
import HtmlEditor from "@/components/HtmlEditor";


const AddBlog = () => {
    const [blogCreate, { loading, error }] = useMutation(CREATE_BLOG, {
        refetchQueries: ["blogGetAll", "blogGet"]
    });
    const { selectImages, resetSelectedImages } = useSelectImages();
    const [editorValue, setEditorValue] = useState<string>("");
    const { setModal } = useModal();
    const router = useRouter();
    const onSubmit: SubmitHandler<any> = async (
        data: any
    ) => {
        data.details = editorValue;
        data.thumbnailIds = selectImages.map(image => image.id);
        try {
            const res = await blogCreate({
                variables: {
                    input: data,
                },
            });
            if (res.data) {
                message.success("blog created successfully");
                resetSelectedImages();
                router.push("/blog");
            }
        } catch (err) {
            message.error(error?.message || "Something want wrong. please try again!");
        }
    };

    useEffect(() => {
        resetSelectedImages();
    }, [])

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
                <Title level={3}>Add New Blog</Title>
                <Form submitHandler={onSubmit} resolver={yupResolver(BlogInputSchema)}>
                    <Flex gap="large" style={{ width: "100%" }} justify="space-between">
                        <Flex vertical gap="large" style={{ flexBasis: "50%" }}>
                            <FormInput
                                name="title"
                                label="Write Title"
                                required
                                placeholder="Enter Your Title"
                                type="text"
                            />
                            {/* <FormTextArea
                                name="details"
                                label="Write details"
                                placeholder="Write your blog details"
                                rows={5}
                            /> */}
                            <HtmlEditor editorValue={editorValue} setEditorValue={setEditorValue} />
                        </Flex>
                        <Flex vertical gap="large" style={{ flexBasis: "50%" }}>
                            <FormInput
                                name="readTime"
                                label="Read Time"
                                placeholder="Write about read time"
                            />
                            <BlogCategoryField />

                            <FormCheckbox label="IsActive" defaultValue={true} name="isActive" />
                            {showSelectedImage}
                            <Button
                                type="default"
                                icon={<UploadOutlined />}
                                onClick={() => setModal(MODAL_ENUMS.OPEN_GALLERY_MODAL)}
                            >
                                Select Image
                            </Button>
                            {/* {<small style={{ color: "red" }}>Please select at least a Image</small>} */}
                            <Button
                                loading={loading}
                                disabled={loading}
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                Create Blog
                            </Button>
                        </Flex>
                    </Flex>
                </Form>
            </Card>
            <GalleryModal />
        </>
    );
};

export default AddBlog;

