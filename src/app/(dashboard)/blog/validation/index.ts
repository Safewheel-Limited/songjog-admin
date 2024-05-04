import * as yup from "yup";

export const BlogInputSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  //details: yup.string().required("Details are required"),
  blogCategoryId: yup.number().required("Blog category ID is required"),
  readTime: yup.string().required("Read time is required"),
  isActive: yup.boolean(),
});
