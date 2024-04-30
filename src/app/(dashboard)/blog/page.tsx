"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import DynamicTable from '@/components/ui/DynamicTable';
import { Button, Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { GET_ALL_BLOG } from './graphql';
import BlogColumnRender from './components/blog.column';

const BlogListPage = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_BLOG });
    const router = useRouter();
    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Blogs</h2>
            <Button type="primary" onClick={() => router.push("/blog/create-blog")}>Add New Blog</Button>
        </Flex>
    )
    return (
        <Card title={title}>
            <DynamicTable
                columns={BlogColumnRender()}
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

export default BlogListPage;