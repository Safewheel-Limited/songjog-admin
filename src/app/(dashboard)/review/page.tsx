"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks'
import { MODAL_ENUMS } from '@/common/constants';
import DynamicTable from '@/components/ui/DynamicTable';
import { Button, Card, Flex } from 'antd';
import { useModal } from '@/common/store';
import { GET_ALL_REVIEW } from './graphql';
import ReviewColumnRenderer from './components/review.column';
import ReviewAddModal from './components/add-review.modal';
import ReviewUpdateModal from './components/update-review.modal';

const LessonListPage = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_REVIEW });
    const { setModal } = useModal();
    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Reviews</h2>
            <Button type="primary" onClick={() => setModal(MODAL_ENUMS.OPEN_ADD_REVIEW_MODAL)}>Add Review</Button>
        </Flex>
    )

    return (
        <Card title={title}>
            <DynamicTable
                columns={ReviewColumnRenderer()}
                dataSource={data?.reviewGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={data?.reviewGetAll?.pagination?.total}
                pageSize={page}
            />
            <ReviewUpdateModal />
            <ReviewAddModal />
        </Card>
    )
}

export default LessonListPage
