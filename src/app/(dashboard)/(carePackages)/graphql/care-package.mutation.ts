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
      carePackageTime {
        title
        title
      }
    }
  }
`;
