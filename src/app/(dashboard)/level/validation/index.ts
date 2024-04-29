import * as yup from "yup";

export const levelSchema = yup.object().shape({
  levelTitle: yup.string().required("Title is required"),
});
