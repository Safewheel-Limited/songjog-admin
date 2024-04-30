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

import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import { useRouter } from "next/navigation";
import LessonItemDropdownField from "../components/lessonItemsDropdownField";
import HtmlEditor from "@/components/HtmlEditor";
import { useState } from "react";
import { CREATE_LESSON_ITEM } from "../graphql";

const AddLessonItem = () => {
  const [lessonItemCreate, { loading, error }] = useMutation(CREATE_LESSON_ITEM, {
      refetchQueries: ["courseGetAll"]
  });
  const [editorValue, setEditorValue] = useState<string>("");

  const { selectImages, resetSelectedImages } = useSelectImages();
  const { setModal } = useModal();
  const router = useRouter();
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.description = editorValue;
    data.galleryIds = selectImages.map(image => image.id);
    try {
        const res = await lessonItemCreate({
            variables: {
                input: data,
            },
        });
        if (res.data) {
            message.success("Lesson Item create successfully");
            resetSelectedImages();
            router.push("/lesson-items");
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
              borderRadius: "10px",
            }}
          />
        ))}
    </Flex>
  );

  return (
    <>
      <Card>
        <Title level={3}>Add New Course</Title>
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
              <HtmlEditor editorValue={editorValue} setEditorValue={setEditorValue} />
            </Flex>
            <Flex vertical gap="large" style={{ flexBasis: "50%" }}>
              <FormInput
                name="time"
                label="Time"
                placeholder="Write time time"
                required
              />
              <LessonItemDropdownField />
              {showSelectedImage}
              <Button
                type="default"
                icon={<UploadOutlined />}
                onClick={() => setModal(MODAL_ENUMS.OPEN_GALLERY_MODAL)}
              >
                Select Image
              </Button>
              {!selectImages.length && <small style={{ color: "red" }}>Please select at least a Image</small>}
              <Button
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit"
                block
              >
                Create Lesson Item
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Card>
      <GalleryModal />
    </>
  );
};

export default AddLessonItem;
