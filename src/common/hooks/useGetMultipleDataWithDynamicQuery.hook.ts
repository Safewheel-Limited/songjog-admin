import { useQuery, DocumentNode } from "@apollo/client";
import { useState } from "react";

interface UsePackageTimeQueryProps {
  query: DocumentNode;
  variables?: Record<string, any>;
  initialPage?: number;
  initialLimit?: number;
}

interface UsePackageTimeQueryResult<T> {
  data: T;
  loading: boolean;
  refetch: () => void;
  page: number;
  limit: number;
  onPaginationChange: (current: number, pageSize: number) => void;
}

export const useGetMultipleDataWithDynamicQuery = <T>({
  query,
  variables,
  initialPage = 1,
  initialLimit = 10,
}: UsePackageTimeQueryProps): UsePackageTimeQueryResult<T> => {
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);

  const { data, loading, refetch } = useQuery(query, {
    variables: {
      ...variables,
      paginationQuery: {
        limit: limit,
        page: page,
      },
      filterQuery: {},
    },
  });

  const onPaginationChange = (current: number, pageSize: number) => {
    setPage(current);
    setLimit(pageSize);
  };
  return {
    data,
    loading,
    refetch,
    page,
    limit,
    onPaginationChange,
  };
};
