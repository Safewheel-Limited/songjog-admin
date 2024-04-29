import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation reviewCreate($input: CreateReviewInput!) {
    reviewCreate(createReviewInput: $input) {
      id
      comment
      rating
      courseId
      userId
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation reviewUpdate($input: UpdateReviewInput!) {
    reviewUpdate(updateReviewInput: $input) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation reviewDelete($id: Int!) {
    reviewDelete(id: $id) {
      id
    }
  }
`;
