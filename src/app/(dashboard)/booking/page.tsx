"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import DynamicTable from '@/components/ui/DynamicTable';
import { Button, Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { GET_ALL_BOOKING } from './graphql';
import BookingColumnRender from './components/booking.column';

const BookingListPage = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_BOOKING });
    console.log(`🚀 ~ data:`, data)

    const router = useRouter();
    const title = (
        <h2>All Bookings</h2>
    )
    return (
        <Card title={title}>
            <DynamicTable
                columns={BookingColumnRender()}
                dataSource={(data as any)?.blogGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={(data as any)?.blogGetAll?.pagination?.total}
                pageSize={page}
            />
        </Card>
    )
}

export default BookingListPage;