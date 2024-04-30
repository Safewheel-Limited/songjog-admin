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
import FormSelectField from "@/components/Forms/FormSelectField";
import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";
import { GET_ALL_COURSE } from "../../course/graphql";
import { convertDataToFormSelectOptions } from "@/common/utils";
import { GET_REVIEW, UPDATE_REVIEW } from "../graphql";
import { reviewSchema } from "../validation";
import FormTextArea from "@/components/Forms/FormTextArea";
import { useSaveReviewId } from "../store";

const ReviewUpdateModal = () => {
  const { modal, setModal } = useModal();
  const { reviewId } = useSaveReviewId();
  const { data: courses } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_COURSE });
  const [defaultValues, setDefaultValues] = useState({});
  const { data } = useQuery(GET_REVIEW, {
    variables: {
      id: Number(reviewId),
    },
  });

  const [reviewUpdate, { loading, error }] = useMutation(UPDATE_REVIEW, {
    refetchQueries: ["reviewGetAll", "reviewGet"],
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.courseId = Number(data.courseId)
    try {
      const result = await reviewUpdate({
        variables: {
          input: {
            id: Number(reviewId),
            ...data
          },
        },
      });

      if (result.data) {
        message.success("review updated Successful.");
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

  useEffect(() => {
    setDefaultValues({
      rating: data?.reviewGet?.rating,
      comment: data?.reviewGet?.comment,
      courseId: data?.reviewGet?.courseId,
    })

    console.log("data", data);
  }, [data])


  return (
    <DynamicModal
      title="Update Lesson"
      isOpen={modal === MODAL_ENUMS.OPEN_UPDATE_REVIEW_MODAL}
      closeModal={() => setModal("")}
      showCancelButton
      footer={false}
    >
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(reviewSchema)}
        defaultValues={defaultValues}
      >
        <Flex vertical gap="large">
          <FormSelectField
            name="courseId"
            options={convertDataToFormSelectOptions((courses as any)?.courseGetAll?.data)}
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
            Update Review
          </Button>
        </Flex>
      </Form>
    </DynamicModal>
  );
};

export default ReviewUpdateModal;
