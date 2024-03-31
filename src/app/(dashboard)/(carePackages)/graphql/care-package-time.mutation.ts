import { gql } from "@apollo/client";

export const CREATE_CARE_PACKAGE_TIME = gql`
  mutation carePackageTimeCreate($input: CarePackageTimeInput!) {
    carePackageTimeCreate(carePackageTimeInput: $input) {
      id
      title
    }
  }
`;

export const UPDATE_CARE_PACKAGE_TIME = gql`
  mutation carePackageTimeUpdate($input: UpdateCarePackageTimeInput!) {
    carePackageTimeUpdate(updateCarePackageTimeInput: $input) {
      id
      title
    }
  }
`;

export const DELETE_CARE_PACKAGE_TIME = gql`
  mutation carePackageTimeDelete($input: Float!) {
    carePackageTimeDelete(id: $input) {
      id
      title
    }
  }
`;
