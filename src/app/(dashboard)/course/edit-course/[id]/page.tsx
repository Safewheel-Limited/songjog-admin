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
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import { useRouter } from "next/navigation";

import { CreateCourseFormValues } from "../../types";
import { GET_COURSE, UPDATE_COURSE } from "../../graphql";
import { CARE_PACKAGE_TIME_GET_ALL } from "@/app/(dashboard)/(carePackages)/graphql";
import { useEffect, useState } from "react";

const EditCourse = ({ params }: { params: { id: string } }) => {

    const [defaultValues, setDefaultValues] = useState<Partial<CreateCourseFormValues>>({})
    const { selectImages, handleSelectImages, resetSelectedImages } = useSelectImages();
    const { setModal } = useModal();
    const router = useRouter();

    const { data } = useGetMultipleDataWithDynamicQuery({
        query: CARE_PACKAGE_TIME_GET_ALL,
    });

    const { data: singleCourse } = useGetSingleDataWithDynamicQuery({
        query: GET_COURSE,
        variables: {
            id: +params.id
        }
    });

    useEffect(() => {
        if (singleCourse) {
            const { title, about_course, course_time, thumbnails, levelId, price, description, lesson } = singleCourse?.courseGet;
            setDefaultValues({
                title, about_course, course_time, thumbnailsIds: thumbnails, levelId, price, description, lessonIds: lesson
            });

            thumbnails.forEach((item) => (
                handleSelectImages({ id: item.id, fileUrl: item.fileUrl })
            ))
        }
    }, [singleCourse, handleSelectImages])


    const [updateCourse, { data: courseData, loading, error }] = useMutation(UPDATE_COURSE, {
        refetchQueries: ["getCourse"]
    });

    const onSubmit: SubmitHandler<CreateCourseFormValues> = async (
        data: CreateCourseFormValues
    ) => {
        data.thumbnailsIds = selectImages.map(image => image.id);
        data.lessonIds = [];
        data.price = Number(data.price);
        data.levelId = Number(data.levelId);
        data.authorId = "f5d89311-153f-47aa-976b-0b2313e45823";
        try {
            const res = await updateCourse({
                variables: {
                    input: data,
                },
            });
            if (res.data) {
                message.success("Course created successfully");
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

    console.log("data", data);

    return (
        <>
            <Card>
                <Title level={3}>Add New Course</Title>
                <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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

                            <FormSelectField
                                mode="multiple"
                                name="lessonIds"
                                options={[
                                    { value: "1", label: "lesson 1" },
                                    { value: "2", label: "lesson 2" },
                                    { value: "3", label: "lesson 3" },
                                    { value: "4", label: "lesson 4" },
                                ]}
                                placeholder="Select Lessons"
                                label="Select Lessons"
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
