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
import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";
import { GET_ALL_COURSE } from "../../course/graphql";
import { convertDataToFormSelectOptions } from "@/common/utils";
import { CREATE_REVIEW } from "../graphql";
import FormTextArea from "@/components/Forms/FormTextArea";
import { reviewSchema } from "../validation";

const ReviewAddModal = () => {
  const { modal, setModal } = useModal();
  const [reviewCreate, { loading, error }] = useMutation(CREATE_REVIEW, {
    refetchQueries: ["reviewGetAll"],
  });

  const {
    data: courses,
  } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_COURSE });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.courseId = Number(data.courseId)
    try {
      const result = await reviewCreate({
        variables: {
          input: data,
        },
      });

      if (result.data) {
        message.success("Review created Successfully.");
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
      isOpen={modal === MODAL_ENUMS.OPEN_ADD_REVIEW_MODAL}
      closeModal={() => setModal("")}
      showCancelButton
      footer={false}
    >
      <Form submitHandler={onSubmit} resolver={yupResolver(reviewSchema)}>
        <Flex vertical gap="large">
          <FormSelectField
            name="courseId"
            options={convertDataToFormSelectOptions(courses?.courseGetAll?.data)}
            placeholder="Select Course"
            label="Select Course"
            required
          />
          <FormInput
            name="rating"
            label="Ratings"
            required
            placeholder="Enter Your Ratings"
            type="number"
          />
          <FormTextArea
            name="comment"
            label="Comment"
            placeholder="Write your comment"
            rows={5}
          />

          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
            block
          >
            Add Review
          </Button>
        </Flex>
      </Form>
    </DynamicModal>
  );
};

export default ReviewAddModal;
