"use client";

import PackageListsColumnRenderer from '../../package-time/_components/package-time-lists.column';
import useGetMultipleDataWithDynamicQuery from '../../../../../common/hooks/useGetMultipleDataWithDynamicQuery.hook';
import DynamicTable from '@/components/ui/DynamicTable';
import { GET_ALL_CARE_PACKAGES } from '../../graphql';

const CarePackageLists = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_CARE_PACKAGES });
    return (
        <>
            <DynamicTable
                columns={PackageListsColumnRenderer()}
                dataSource={data?.carePackageTimeGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={data?.roleAccessGetAll?.pagination?.total}
                pageSize={page}
            />
        </>
    )
}

export default CarePackageLists;