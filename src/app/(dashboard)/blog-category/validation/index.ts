import * as yup from "yup";

export const blogCategorySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
