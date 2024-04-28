import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation courseCreate($input: CreateCourseInput!) {
    courseCreate(createCourseInput: $input) {
      id
      title
      description
      course_time
      levelId
      price
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation courseUpdate($input: UpdateCourseInput!) {
    courseUpdate(updateCourseInput: $input) {
      id
      title
      description
      course_time
      levelId
      price
      createdAt
      updatedAt
    }
  }
`;

export const COURSE_DELETE = gql`
  mutation courseDelete($id: Int!) {
    courseDelete(id: $id) {
      title
      id
    }
  }
`;
