import { gql } from "@apollo/client";

export const ENROLLMENT_DELETE = gql`
  mutation enrollmentDelete($id: Int!) {
    enrollmentDelete(id: $id) {
      id
    }
  }
`;
