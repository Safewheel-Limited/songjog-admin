"use client";

import DynamicTable from "@/components/ui/DynamicTable";
import { useGetMultipleDataWithDynamicQuery } from "@/common/hooks";
import { Button, Card, Flex } from "antd";
import { useRouter } from "next/navigation";
import { GET_ALL_LEVEL } from "./graphql";
import LevelColumnRender from "./component/level.column";

const LevelList: React.FC = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_LEVEL });
    const router = useRouter();

    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Levels</h2>
            <Button type="primary" onClick={() => router.push("/level/create-level")}>Add New Level</Button>
        </Flex>
    )

    return (
        <Card title={title}>
            <DynamicTable
                columns={LevelColumnRender()}
                dataSource={(data as any)?.levelGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={(data as any)?.levelGetAll?.pagination?.total}
                pageSize={page}
            />
            {/* <PackageTimeUpdateModal /> */}
        </Card>
    );
};

export default LevelList;
