import { gql } from "@apollo/client";

export const GALLERY_CREATE = gql`
  mutation galleryCreate($file: Upload!) {
    galleryCreate(galleryCreate: { file: $file }) {
      id
      fileUrl
    }
  }
`;
