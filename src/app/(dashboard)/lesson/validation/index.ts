import * as yup from "yup";

export const lessonSchema = yup.object().shape({
    lesson_title: yup.string().required("Title is required"),
    lesson_time: yup.string().required(" Time is required"),
    courseId: yup.string().required("Select course"),
});
