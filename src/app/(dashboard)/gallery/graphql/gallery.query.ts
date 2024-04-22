import { gql } from "@apollo/client";

export const GALLERY_GET_ALL = gql`
  query galleryGetAll(
    $paginationQuery: GlobalPagination!
    $filterQuery: GalleryFilter!
  ) {
    galleryGetAll(
      paginationQuery: $paginationQuery
      filterQuery: $filterQuery
    ) {
      status
      data {
        id
        name
        fileUrl
      }
      pagination {
        page
        limit
        total
        totalPages
      }
    }
  }
`;
