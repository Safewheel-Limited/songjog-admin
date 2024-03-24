import { gql } from "@apollo/client";

export const CREATE_PERMISSION = gql`
  mutation permissionCreate($input: CreatePermissionInput!) {
    permissionCreate(createPermissionInput: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PERMISSION = gql`
  mutation permissionUpdate($input: UpdatePermissionInput!) {
    permissionUpdate(updatePermissionInput: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PERMISSION = gql`
  mutation permissionDelete($id: Int!) {
    permissionDelete(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
