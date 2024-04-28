/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Flex, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import DynamicModal from "@/components/ui/DynamicModal";
import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import { useSaveLessonId } from "../store";
import FormSelectField from "@/components/Forms/FormSelectField";
import { GET_LESSON } from "../graphql/lesson.query";
import { UPDATE_LESSON } from "../graphql/lesson.mutation";
import { lessonSchema } from "../validation";
import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";
import { GET_ALL_COURSE } from "../../course/graphql";
import { convertDataToFormSelectOptions } from "@/common/utils";

const LessonUpdateModal = () => {
  const { modal, setModal } = useModal();
  const { lessonId } = useSaveLessonId();
  const { data:courses } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_COURSE });
  const [defaultValues, setDefaultValues] = useState({});
  const { data } = useQuery(GET_LESSON, {
    variables: {
      id: Number(lessonId),
    },
  });

  const [updateLesson, { loading, error }] = useMutation(UPDATE_LESSON, {
    refetchQueries: ["lessonGetAll", "lessonGet"],
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.courseId = Number(data.courseId)
    try {
      const result = await updateLesson({
        variables: {
          input: {
            id: Number(lessonId),
            ...data
          },
        },
      });

      if (result.data) {
        message.success("Lesson updated Successful.");
        setModal("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error.message || "Something want wrong! Please try again");
    }
  }, [error]);

  useEffect(() =>{
    setDefaultValues({
      lesson_title: data?.lessonGet?.lesson_title,
      lesson_time: data?.lessonGet?.lesson_time,
      courseId:data?.lessonGet?.courseId,
    })
  }, [data])

  return (
    <DynamicModal
      title="Update Lesson"
      isOpen={modal === MODAL_ENUMS.OPEN_UPDATE_LESSON_MODAL}
      closeModal={() => setModal("")}
      showCancelButton
      footer={false}
    >
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(lessonSchema)}
        defaultValues={defaultValues}
      >
        <Flex vertical gap="large">
          <FormInput
            name="lesson_title"
            label="Lesson Title"
            required
            placeholder="Enter Your Lesson title"
            type="text"
          />
          <FormInput
            name="lesson_time"
            label="Lesson Time"
            required
            placeholder="Enter your lesson time"
            type="text"
          />
          <FormSelectField
            name="courseId"
            options={convertDataToFormSelectOptions(courses?.courseGetAll?.data)}
            placeholder="Select Course"
            label="Select Course"
            required
          />
          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
            block
          >
            Update Lesson
          </Button>
        </Flex>
      </Form>
    </DynamicModal>
  );
};

export default LessonUpdateModal;
