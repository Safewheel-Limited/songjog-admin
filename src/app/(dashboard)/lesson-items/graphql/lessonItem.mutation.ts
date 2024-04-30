import { gql } from "@apollo/client";

export const CREATE_LESSON_ITEM = gql`
  mutation lessonItemCreate($input: CreateLessonItemInput!) {
    lessonItemCreate(createLessonItemInput: $input) {
      id
    }
  }
`;

export const UPDATE_LESSON_ITEM = gql`
  mutation lessonItemUpdate($input: UpdateLessonItemInput!) {
    lessonItemUpdate(updateLessonItemInput: $input) {
      id
    }
  }
`;

export const DELETE_LESSON_ITEM = gql`
  mutation lessonItemDelete($id: Int!) {
    lessonItemDelete(id: $id) {
      id
    }
  }
`;
