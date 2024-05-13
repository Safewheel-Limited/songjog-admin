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
import { useGetMultipleDataWithDynamicQuery, useGetSingleDataWithDynamicQuery } from "@/common/hooks";

import FormTextArea from "@/components/Forms/FormTextArea";
import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_BLOG, UPDATE_BLOG } from "../../graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import { BlogInputSchema } from "../../validation";
import BlogCategoryField from "../../components/BlogCategoryIdField";
import FormCheckbox from "@/components/Forms/FormCheckBox";
import HtmlEditor from "@/components/HtmlEditor";

const EditBlogPage = ({ params }: { params: { id: string } }) => {
    const [defaultValues, setDefaultValues] = useState({});
    const [editorValue, setEditorValue] = useState<string>("");
    const { selectImages, handleSelectImages, resetSelectedImages } = useSelectImages();
    const { data: singleBlog } = useGetSingleDataWithDynamicQuery({
        query: GET_BLOG,
        variables: {
            id: +params.id
        }
    });

    const [blogUpdate, { loading, error }] = useMutation(UPDATE_BLOG, {
        refetchQueries: ["blogGetAll", "blogGet"]
    })

    useEffect(() => {
        if ((singleBlog as any)?.blogGet) {
            const { title, details, readTime, blogCategoryId, isActive } = (singleBlog as any)?.blogGet;
            setDefaultValues({ title, readTime, blogCategoryId, isActive });
            setEditorValue(details);
            resetSelectedImages();
            (singleBlog as any)?.blogGet.thumbnails?.forEach((item: any) => (
                handleSelectImages({ id: item.id, fileUrl: item.fileUrl })
            ))
        }
    }, [handleSelectImages, singleBlog])

    const { setModal } = useModal();
    const router = useRouter();

    const onSubmit: SubmitHandler<any> = async (
        data: any
    ) => {
        data.id = +params.id;
        data.thumbnailIds = selectImages.map(image => image.id);
        data.details = editorValue;
        try {
            const res = await blogUpdate({
                variables: {
                    input: data,
                },
            });
            if (res.data) {
                message.success("blog updated successfully");
                resetSelectedImages();
                setDefaultValues({})
                router.push("/blog")
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
                <Title level={3}>Update {defaultValues?.title} blog</Title>
                <Form submitHandler={onSubmit} resolver={yupResolver(BlogInputSchema)} defaultValues={defaultValues}>
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
                            <FormCheckbox label="IsActive" name="isActive" />
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
                                Update Blog
                            </Button>
                        </Flex>
                    </Flex>
                </Form>
            </Card>
            <GalleryModal />
        </>
    );
};

export default EditBlogPage;
