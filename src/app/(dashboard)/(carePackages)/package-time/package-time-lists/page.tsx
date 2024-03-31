"use client";

import useGetMultipleDataWithDynamicQuery from "../../hooks/useGetMultipleDataWithDynamicQuery.hook";
import PackageListsColumnRenderer from "../_components/package-time-lists.column";
import { CARE_PACKAGE_TIME_GET_ALL } from "../../graphql";
import DynamicTable from "@/components/ui/DynamicTable";

const PackageTimeLists: React.FC = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: CARE_PACKAGE_TIME_GET_ALL });
    return (
        <div>
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
        </div>
    );
};

export default PackageTimeLists;
