import { gql } from "@apollo/client";

export const CREATE_CARE_PACKAGE = gql`
  mutation carePackageCreate($input: CarePackageInput!) {
    carePackageCreate(carePackageInput: $input) {
      id
      title
      description
      thumbnails {
        id
        name
        fileUrl
      }
      price
      createdAt
      updatedAt
      level
    }
  }
`;

export const CARE_PACKAGE_DELETE = gql`
  mutation carePackageDelete($id: Float!) {
    carePackageDelete(id: $id) {
      title
      id
    }
  }
`;
