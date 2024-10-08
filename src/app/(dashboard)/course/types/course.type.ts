export type CreateCourseFormValues = {
  title: string;
  description: string;
  about_course: string;
  price: number;
  thumbnailsIds: number[];
  course_time: string;
  authorId: string;
  lessonIds: number[];
  levelId: number;
};
export type UpdateCourseFormValues = {
  id: number;
  title: string;
  description: string;
  about_course: string;
  price: number;
  thumbnailsIds: number[];
  course_time: string;
  authorId: string;
  lessonIds: number[];
  levelId: number;
};
