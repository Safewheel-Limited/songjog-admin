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
import { useGetSingleDataWithDynamicQuery } from "@/common/hooks";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import { useRouter } from "next/navigation";

import { CreateCourseFormValues } from "../../types";
import { GET_COURSE, UPDATE_COURSE } from "../../graphql";
import { useEffect, useState } from "react";
import CourseSelectFieldWithOptionsData from "../../_component/CourseSelectFieldWithOptionsData";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseUpdateSchema } from "../../validation";

const EditCourse = ({ params }: { params: { id: string } }) => {

    const [defaultValues, setDefaultValues] = useState<Partial<CreateCourseFormValues>>({})
    const { selectImages, handleSelectImages, resetSelectedImages } = useSelectImages();
    const { setModal } = useModal();
    const router = useRouter();


    const { data: singleCourse } = useGetSingleDataWithDynamicQuery({
        query: GET_COURSE,
        variables: {
            id: +params.id
        }
    });

    useEffect(() => {
        if (singleCourse) {
            const { title, about_course, course_time, thumbnails, levelId, price, description, lesson } = singleCourse?.courseGet;
            const modifyLesson = lesson?.map((lsn: { id: number }) => lsn.id);
            setDefaultValues({
                title, about_course, course_time, thumbnailsIds: thumbnails, levelId, price, description, lessonIds: modifyLesson
            });

            thumbnails.forEach((item: any) => (
                handleSelectImages({ id: item.id, fileUrl: item.fileUrl })
            ))
        }
    }, [singleCourse, handleSelectImages])


    const [updateCourse, { loading, error }] = useMutation(UPDATE_COURSE, {
        refetchQueries: ["getCourse", "courseGetAll"]
    });

    const onSubmit: SubmitHandler<CreateCourseFormValues> = async (
        data: any
    ) => {

        data.id = +params.id;
        data.thumbnailsIds = selectImages.map(image => image.id);
        data.price = Number(data.price);
        data.levelId = Number(data.levelId);
        data.authorId = "f5d89311-153f-47aa-976b-0b2313e45823";

        console.log("data", data);

        try {
            const res = await updateCourse({
                variables: {
                    input: data,
                },
            });
            if (res.data) {
                message.success("Course updated successfully");
                resetSelectedImages();
                router.push("/course/course-lists");
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
                <Title level={3}>Edit {defaultValues?.title} Course</Title>
                <Form submitHandler={onSubmit} defaultValues={defaultValues} resolver={yupResolver(courseUpdateSchema)}>
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
                                name="about_course"
                                label="Write About Course"
                                placeholder="Write about your course"
                            />

                            <FormInput
                                name="levelId"
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
                            <FormInput
                                name="course_time"
                                label="Course Time"
                                placeholder="Write course time"
                                required
                            />

                            <CourseSelectFieldWithOptionsData />
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
                                Update Course
                            </Button>
                        </Flex>
                    </Flex>
                </Form>
            </Card>
            <GalleryModal />
        </>
    );
};

export default EditCourse;
