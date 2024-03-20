import * as yup from "yup";

export const loginSchema = yup.object().shape({
  phoneOrEmail: yup.string().required("Phone Or Email is required"),
  password: yup.string().required("Password is required").min(6).max(32),
});
