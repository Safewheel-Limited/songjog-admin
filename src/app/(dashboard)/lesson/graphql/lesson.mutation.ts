import { gql } from "@apollo/client";

export const CREATE_LESSON = gql`
  mutation lessonCreate($input: CreateLessonInput!) {
    lessonCreate(createLessonInput: $input) {
      id
    }
  }
`;

export const UPDATE_LESSON = gql`
  mutation lessonUpdate($input: UpdateLessonInput!) {
    lessonUpdate(updateLessonInput: $input) {
      id
    }
  }
`;

export const DELETE_LESSON = gql`
  mutation lessonDelete($id: Int!) {
    lessonDelete(id: $id) {
      id
    }
  }
`;
