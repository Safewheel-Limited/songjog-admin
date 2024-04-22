/* eslint-disable jsx-a11y/alt-text */
"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Flex, Image, message, Pagination, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GALLERY_CREATE } from "./graphql/gallery.mutation";
import { GALLERY_GET_ALL } from "./graphql/gallery.query";
import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const GalleryPage: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [galleryCreate, { loading: isLoading, error }] = useMutation(
        GALLERY_CREATE,
        {
            refetchQueries: ["galleryGetAll"],
        }
    );

    const { data, limit, loading, page, onPaginationChange } =
        useGetMultipleDataWithDynamicQuery({ query: GALLERY_GET_ALL });
    const { pagination } = data?.galleryGetAll || {};
    const handleChange: UploadProps["onChange"] = async (info) => {
        const isJpgOrPng =
            info.file.type === "image/jpeg" || info.file.type === "image/png";
        if (!isJpgOrPng) {
            return message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = info.file.size! / 1024 / 1024 < 2;

        if (!isLt2M) {
            return message.error("Image must smaller than 2MB!");
        }

        if (info.file.status === "done") {
            getBase64(info.file.originFileObj as FileType, (url) => {
                setImageUrl(url);
            });
        }
        try {
            const res = await galleryCreate({
                variables: {
                    file: info.file,
                },
            });
            if (res.data.galleryCreate) {
                setImageUrl(res.data.galleryCreate.fileUrl);
                message.success("Image upload successfull");
            }
        } catch (err) {
            message.error(error?.message as string);
        }
    };

    const uploadButton = (
        <button
            style={{ border: 0, background: "none", cursor: "pointer" }}
            type="button"
        >
            {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Card title="Upload Image">
                <Flex
                    gap="middle"
                    wrap="wrap"
                    justify="start"
                    style={{ width: "100%" }}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleChange}
                        style={{
                            cursor: "pointer",
                        }}
                    >
                        {uploadButton}
                    </Upload>
                </Flex>

                <Flex gap="middle" wrap="wrap" justify="start" align="center" style={{ marginBottom: "30px" }}>
                    {data?.galleryGetAll.data &&
                        data?.galleryGetAll.data?.map((img: any) => (
                            <Image
                                width={200}
                                height={200}
                                src={img.fileUrl}
                                key={img.fileUrl}
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "5px"
                                }}
                                loading="lazy"
                                preview
                                placeholder={
                                    <Image
                                        preview={false}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                        width={200}
                                    />
                                }
                            />
                        ))}
                </Flex>
                <Pagination
                    total={pagination?.total}
                    onChange={onPaginationChange}
                    pageSize={limit}
                    current={page}
                />
            </Card>
        </>
    );
};

export default GalleryPage;
