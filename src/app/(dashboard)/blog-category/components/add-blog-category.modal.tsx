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
import { blogCategorySchema } from "../validation";
import { CREATE_BLOG_CATEGORY } from "../graphql/blog-category.mutation";

const BlogCategoryAddModal = () => {
  const { modal, setModal } = useModal();
  const [blogCategoryCreate, { loading, error }] = useMutation(CREATE_BLOG_CATEGORY, {
    refetchQueries: ["blogCategoryGetAll"],
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const result = await blogCategoryCreate({
        variables: {
          input: data,
        },
      });

      if (result.data) {
        message.success("blog category created Successfully.");
        setModal("");
      }
    } catch (err) {
      message.error(error?.message || "Something went wrong! Please try again");
      console.log(err);
    }
  };
  return (
    <DynamicModal
      title="Add Blog Category"
      isOpen={modal === MODAL_ENUMS.OPEN_ADD_BLOG_CATEGORY_MODAL}
      closeModal={() => setModal("")}
      showCancelButton
      footer={false}
    >
      <Form submitHandler={onSubmit} resolver={yupResolver(blogCategorySchema)}>
        <Flex vertical gap="large">
          <FormInput
            name="title"
            label="Blog Category Title"
            required
            placeholder="Enter Your blog category title"
            type="text"
          />
          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
            block
          >
            Add Blog Category
          </Button>
        </Flex>
      </Form>
    </DynamicModal>
  );
};

export default BlogCategoryAddModal;
