"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import DynamicTable from '@/components/ui/DynamicTable';

import { Button, Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import EnrollmentColumnRenderer from './component/enrollment.column';
import { GET_ALL_ENROLLMENT } from './graphql';

const EnrollementList = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_ENROLLMENT });

    console.log("data", data);
    const router = useRouter();
    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Enrollements</h2>
            {/* <Button type="primary" onClick={() => router.push("/course/add-course")}>Add New Course</Button> */}
        </Flex>
    )
    return (
        <Card title={title}>
            <DynamicTable
                columns={EnrollmentColumnRenderer()}
                dataSource={(data as any)?.courseGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={(data as any)?.courseGetAll?.pagination?.total}
                pageSize={page}
            />
        </Card>
    )
}

export default EnrollementList;