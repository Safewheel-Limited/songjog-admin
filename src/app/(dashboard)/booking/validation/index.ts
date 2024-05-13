import * as yup from "yup";

export const BookingInputSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  //details: yup.string().required("Details are required"),
  bookingCategoryId: yup.number().required("Booking category ID is required"),
  readTime: yup.string().required("Read time is required"),
  isActive: yup.boolean(),
});
