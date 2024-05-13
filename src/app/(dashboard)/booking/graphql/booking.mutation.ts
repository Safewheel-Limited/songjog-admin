import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation blogCreate($input: CreateBlogInput!) {
    blogCreate(createBlogInput: $input) {
      id
      title
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation blogUpdate($input: UpdateBlogInput!) {
    blogUpdate(updateBlogInput: $input) {
      id
      title
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation blogDelete($id: Int!) {
    blogDelete(id: $id) {
      id
      title
    }
  }
`;
