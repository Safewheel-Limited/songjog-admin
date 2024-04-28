"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks'
import { GET_ALL_LESSON } from './graphql/lesson.query';
import { useRouter } from 'next/navigation';
import { Button, Card, Flex } from 'antd';
import DynamicTable from '@/components/ui/DynamicTable';
import LessonColumnRender from './components/lesson.column';

const LessonListPage = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_LESSON });
    const router = useRouter();
    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Lessons</h2>
            <Button type="primary" onClick={() => router.push("/lesson/add-lesson")}>Add Lesson</Button>
        </Flex>
    )
    return (
        <Card title={title}>
            <DynamicTable
                columns={LessonColumnRender()}
                dataSource={data?.lessonGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={data?.lessonGetAll?.pagination?.total}
                pageSize={page}
            />
        </Card>
    )
}

export default LessonListPage
