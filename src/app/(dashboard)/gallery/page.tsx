/* eslint-disable jsx-a11y/alt-text */
"use client";

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Flex, Image, message, Pagination, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GALLERY_CREATE } from "./graphql/gallery.mutation";
import GalleryTable from "./components/gallery.table";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const GalleryPage: React.FC = () => {
    const [galleryCreate, { loading: isLoading, error }] = useMutation(
        GALLERY_CREATE,
        {
            refetchQueries: ["galleryGetAll"],
        }
    );

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
                <GalleryTable />
            </Card>
        </>
    );
};

export default GalleryPage;
