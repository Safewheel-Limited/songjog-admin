import { gql } from "@apollo/client";

export const GET_ALL_BOOKING = gql`
  query bookingGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: BookingFilter!
  ) {
    bookingGetAll(paginationQuery: $paginationQuery, filterQuery: $filterQuery) {
      message
      status
      data {
        id
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_BOOKING = gql`
  query bookingGet($id: Int!) {
    bookingGet(id: $id) {
      id
    }
  }
`;
