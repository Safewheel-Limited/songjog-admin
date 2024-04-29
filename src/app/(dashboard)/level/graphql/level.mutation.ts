import { gql } from "@apollo/client";

export const CREATE_LEVEL = gql`
  mutation levelCreate($input: CreateLevelInput!) {
    levelCreate(createLevelInput: $input) {
      id
      levelTitle
      galleryId
    }
  }
`;

export const UPDATE_LEVEL = gql`
  mutation levelUpdate($input: UpdateLevelInput!) {
    levelUpdate(updateLevelInput: $input) {
      id
      levelTitle
      galleryId
    }
  }
`;

export const DELETE_LEVEL = gql`
  mutation levelDelete($id: Int!) {
    levelDelete(id: $id) {
      id
    }
  }
`;
