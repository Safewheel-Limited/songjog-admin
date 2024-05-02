"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks'
import DynamicTable from '@/components/ui/DynamicTable';
import { Button, Card, Flex } from 'antd';
import { GET_ALL_LESSON_ITEMS } from './graphql';
import { useRouter } from 'next/navigation';
import LessonItemColumnRender from './components/LessonItem.column';

const LessonItemListPage = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_LESSON_ITEMS });
    const router = useRouter();
    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Lesson Items</h2>
            <Button type="primary" onClick={() => router.push("/lesson-items/add-lesson-item")}>Add Lesson Item</Button>
        </Flex>
    )
    return (
        <Card title={title}>
            <DynamicTable
                columns={LessonItemColumnRender()}
                dataSource={(data as any)?.lessonItemGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={(data as any)?.lessonItemGetAll?.pagination?.total}
                pageSize={page}
            />
        </Card>
    )
}

export default LessonItemListPage
