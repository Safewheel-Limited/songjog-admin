import * as yup from "yup";

export const reviewSchema = yup.object().shape({
  courseId: yup.string().required("Select course"),
  rating: yup.number().required("rating is required"),
  comment: yup.string().required("comment is required"),
});
