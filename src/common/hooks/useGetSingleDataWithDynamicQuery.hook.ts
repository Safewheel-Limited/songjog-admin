import { useQuery, DocumentNode } from "@apollo/client";

interface useQueryProps {
  query: DocumentNode;
  variables?: Record<string, any>;
}

interface UsePackageTimeQueryResult<T> {
  data: T;
  loading: boolean;
  refetch: () => void;
}

export const useGetSingleDataWithDynamicQuery = <T>({
  query,
  variables,
}: useQueryProps): UsePackageTimeQueryResult<T> => {
  const { data, loading, refetch } = useQuery(query, {
    variables: {
      ...variables,
    },
  });

  return {
    data,
    loading,
    refetch,
  };
};
