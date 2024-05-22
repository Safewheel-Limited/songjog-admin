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
        userId
        careGiverUid
        careGiver {
          id
          fullName
          phone
          email
          gender
          type
        } 
        user {
          id
          fullName
          phone
          email
          gender
          type
        }
        carePackage {
          title
          description
          thumbnails {
            name
            fileUrl
            mobileFileUrl
            desktopFileUrl
          }
          level
          price
          basis
          carePackageTime {
            title
          }
          booking {
            careGiverUid
            careGiver {
              fullName
              phone
              email
            }
            serviceStartDate
            serviceEndDate
            customerPlanDetails
            isCustomPlan
            status
          }
          createdAt
          updatedAt
          
          totalRating
        }
        serviceStartDate
        serviceEndDate
        customerPlanDetails
        isCustomPlan
        status
        note
        carePackageId
        carePackageTimeId
        rating
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
