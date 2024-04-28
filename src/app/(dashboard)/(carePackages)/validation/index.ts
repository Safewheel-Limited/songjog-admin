import * as yup from "yup";

export const carePackageTimeSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export const addCarePackageSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.string().required("Price is required"),
  basis: yup.string().required("Basis is required"),
  carePackageTime: yup.number().required("Care package time is required"),
});
