"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks'
import { GET_ALL_LESSON } from './graphql/lesson.query';
import { MODAL_ENUMS } from '@/common/constants';
import DynamicTable from '@/components/ui/DynamicTable';
import LessonColumnRender from './components/lesson.column';
import { Button, Card, Flex } from 'antd';
import LessonUpdateModal from './components/lesson.modal';
import LessonAddModal from './components/add-lesson.modal';
import { useModal } from '@/common/store';

const LessonListPage = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_LESSON });
    const {setModal} = useModal();
    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Lessons</h2>
            <Button type="primary" onClick={() => setModal(MODAL_ENUMS.OPEN_ADD_LESSON_MODAL)}>Add Lesson</Button>
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
            <LessonUpdateModal />
            <LessonAddModal />
        </Card>
    )
}

export default LessonListPage
