import * as yup from "yup";

export const courseCreateSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("description is required"),
  about_course: yup.string().required("about course is required"),
  price: yup.number().required("price is required"),
  course_time: yup.string().required("course time is required"),
  authorId: yup.string().required("authorId is required"),
  lessonIds: yup
    .array()
    .min(1, "at least one lesson must be select")
    .required("lessonIds is required"),
  levelId: yup.number().required("level is required"),
});

export const courseUpdateSchema = yup.object().shape({
  title: yup.string().notRequired(),
  description: yup.string().notRequired(),
  about_course: yup.string().notRequired(),
  price: yup.number().notRequired(),
  course_time: yup.string().notRequired(),
  authorId: yup.string().notRequired(),
  lessonIds: yup
    .array()
    .min(1, "at least one lesson must be select")
    .notRequired(),
  levelId: yup.string().notRequired(),
});
