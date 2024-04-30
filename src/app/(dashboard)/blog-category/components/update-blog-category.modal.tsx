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
import { blogCategorySchema } from "../validation";
import { useGetSingleDataWithDynamicQuery } from "@/common/hooks";
import { useSaveBlogCategoryId } from "../store";
import { GET_BLOG_CATEGORY, UPDATE_BLOG_CATEGORY } from "../graphql";


const BlogCategoryUpdateModal = () => {
  const { modal, setModal } = useModal();
  const { blogCategoryId } = useSaveBlogCategoryId();
  const [defaultValues, setDefaultValues] = useState({});
  const { data } = useGetSingleDataWithDynamicQuery({
    query: GET_BLOG_CATEGORY, variables: {
      id: +blogCategoryId
    }
  });

  const [blogCategoryUpdate, { loading, error }] = useMutation(UPDATE_BLOG_CATEGORY, {
    refetchQueries: ["blogCategoryGet", "blogCategoryGet"],
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const result = await blogCategoryUpdate({
        variables: {
          input: {
            id: Number(blogCategoryId),
            ...data
          },
        },
      });

      if (result.data) {
        message.success("blog category updated Successful.");
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
      title: (data as any)?.blogCategoryGet?.title,

    })
  }, [data])

  return (
    <DynamicModal
      title="Update Blog Category"
      isOpen={modal === MODAL_ENUMS.OPEN_UPDATE_BLOG_CATEGORY_MODAL}
      closeModal={() => setModal("")}
      showCancelButton
      footer={false}
    >
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(blogCategorySchema)}
        defaultValues={defaultValues}
      >
        <Flex vertical gap="large">
          <FormInput
            name="title"
            label="Blog Category Title"
            required
            placeholder="Enter your blog category title"
            type="text"
          />

          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
            block
          >
            Update Blog Category
          </Button>
        </Flex>
      </Form>
    </DynamicModal>
  );
};

export default BlogCategoryUpdateModal;
