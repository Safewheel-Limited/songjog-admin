"use client";

import PackageListsColumnRenderer from "../_components/package-time-lists.column";
import { CARE_PACKAGE_TIME_GET_ALL } from "../../graphql";
import DynamicTable from "@/components/ui/DynamicTable";
import PackageTimeUpdateModal from "../_components/package-time-update.modal";
import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";
import { Button, Card, Flex } from "antd";
import { useRouter } from "next/navigation";

const PackageTimeLists: React.FC = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: CARE_PACKAGE_TIME_GET_ALL });
    const router = useRouter();

    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Care package time</h2>
            <Button type="primary" onClick={() => router.push("/package-time/create-package-time")}>Add Care Package time</Button>
        </Flex>
    )

    return (
        <Card title={title}>
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
            <PackageTimeUpdateModal />
        </Card>
    );
};

export default PackageTimeLists;
