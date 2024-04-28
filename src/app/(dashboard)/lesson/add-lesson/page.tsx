"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Flex, message } from "antd";
import Title from "antd/es/typography/Title";
import { SubmitHandler } from "react-hook-form";
import { CREATE_LESSON } from "../graphql/lesson.mutation";
import { lessonSchema } from "../validation";
import { useRouter } from "next/navigation";

const AddLessonPage = () => {
  const [lessonCreate, {data, loading, error}] = useMutation(CREATE_LESSON);
  const router = useRouter();
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.courseId = 13;
    const result = await lessonCreate({
        variables: {
            input: data
        }
    })

    if (result.data) {
    message.success("Lesson created Successfully.");
    router.push("/lesson")
  };

  } catch (err) {
    message.error(error?.message || "Something went wrong! Please try again");
      console.log(err)
  }
}
  return (
    <Card style={{marginInline:"150px"}}>
      <Title level={3}>Add Lesson</Title>
      <Form
        submitHandler={onSubmit}
      resolver={yupResolver(lessonSchema)}
      >
        <Flex vertical gap="large" >
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
            options={[{
              value:"2", label:"2"
            }]}
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
    </Card>
  );
};
export default AddLessonPage;
