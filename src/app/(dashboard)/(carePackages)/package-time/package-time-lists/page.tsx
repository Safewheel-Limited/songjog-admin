"use client";

import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import PackageListsColumnRenderer from "../_comonents/package-time-lists.column";
import { CARE_PACKAGE_TIME_GET_ALL } from "../../graphql";
import DynamicTable from "@/components/ui/DynamicTable";

const PackageTimeLists = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const { data, loading } = useQuery(CARE_PACKAGE_TIME_GET_ALL, {
        variables: {
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
