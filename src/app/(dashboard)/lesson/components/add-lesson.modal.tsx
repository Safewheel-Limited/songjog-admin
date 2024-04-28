/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Flex, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";

import DynamicModal from "@/components/ui/DynamicModal";
import FormInput from "@/components/Forms/FormInput";
import { MODAL_ENUMS } from "@/common/constants";
import Form from "@/components/Forms/Form";
import { useModal } from "@/common/store";
import FormSelectField from "@/components/Forms/FormSelectField";
import { CREATE_LESSON } from "../graphql/lesson.mutation";
import { lessonSchema } from "../validation";
import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";
import { GET_ALL_COURSE } from "../../course/graphql";
import { convertDataToFormSelectOptions } from "@/common/utils";

const LessonAddModal = () => {
  const { modal, setModal } = useModal();
  const [lessonCreate, { loading, error }] = useMutation(CREATE_LESSON, {
    refetchQueries: ["lessonGetAll"],
  });

  const {
    data: courses,
  } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_COURSE });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.courseId = Number(data.courseId)
    try {
      const result = await lessonCreate({
        variables: {
          input: data,
        },
      });

      if (result.data) {
        message.success("Lesson created Successfully.");
        setModal("");
      }
    } catch (err) {
      message.error(error?.message || "Something went wrong! Please try again");
      console.log(err);
    }
  };
  return (
    <DynamicModal
      title="Add Lesson"
      isOpen={modal === MODAL_ENUMS.OPEN_ADD_LESSON_MODAL}
      closeModal={() => setModal("")}
      showCancelButton
      footer={false}
    >
      <Form submitHandler={onSubmit} resolver={yupResolver(lessonSchema)}>
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
            Add Lesson
          </Button>
        </Flex>
      </Form>
    </DynamicModal>
  );
};

export default LessonAddModal;
