import * as yup from "yup";

export const carePackageTimeSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
