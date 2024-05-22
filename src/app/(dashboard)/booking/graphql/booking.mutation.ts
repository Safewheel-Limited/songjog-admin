import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation bookingCreate($input: CreateBookingInput!) {
    bookingCreate(createBookingInput: $input) {
      id
      title
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation bookingUpdate($input: UpdateBookingInput!) {
    bookingUpdate(updateBookingInput: $input) {
      id
      title
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation bookingDelete($id: Int!) {
    bookingDelete(id: $id) {
      id
      title
    }
  }
`;
