import { gql } from "@apollo/client";

export const CREATE_BLOG_CATEGORY = gql`
  mutation blogCategoryCreate($input: CreateBlogCategoryInput!) {
    blogCategoryCreate(createBlogCategoryInput: $input) {
      title
      id
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BLOG_CATEGORY = gql`
  mutation blogCategoryUpdate($input: UpdateBlogCategoryInput!) {
    blogCategoryUpdate(updateBlogCategoryInput: $input) {
      id
    }
  }
`;

export const DELETE_BLOG_CATEGORY = gql`
  mutation blogCategoryDelete($id: Int!) {
    blogCategoryDelete(id: $id) {
      id
    }
  }
`;
