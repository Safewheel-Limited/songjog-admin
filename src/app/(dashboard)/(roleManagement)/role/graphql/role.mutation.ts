import { gql } from "@apollo/client";

export const ROLE_ACCESS_CREATE = gql`
  mutation roleAccessCreate($input: CreateRoleInput!) {
    roleAccessCreate(createRoleAccessInput: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const ROLE_ACCESS_UPDATE = gql`
  mutation roleAccessUpdate($input: UpdateRoleInput!) {
    roleAccessUpdate(updateRoleAccessInput: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const ROLE_ACCESS_DELETE = gql`
  mutation roleAccessDelete($id: Int!) {
    roleAccessDelete(id: $id) {
      id
      createdAt
    }
  }
`;

export const ROLE_ASSIGN_TO_USER = gql`
  mutation assignRoleToUser($roleId: Int!, $userId: String!) {
    assignRoleToUser(roleId: $roleId, userId: $userId) {
      id
      name
    }
  }
`;

export const UN_ASSIGN_ROLE_TO_USER = gql`
  mutation unAssignRoleToUser($userId: String!) {
    unAssignRoleToUser(userId: $userId) {
      id
      name
      user_type
    }
  }
`;
