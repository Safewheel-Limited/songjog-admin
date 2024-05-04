"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import { useModal } from '@/common/store';
import { GET_ALL_BLOG_CATEGORY } from './graphql/blog-category.query';
import { MODAL_ENUMS } from '@/common/constants';
import { Button, Card, Flex } from 'antd';
import DynamicTable from '@/components/ui/DynamicTable';
import BlogCategoryColumnRender from './components/blog-category.column';
import BlogCategoryUpdateModal from './components/update-blog-category.modal';
import BlogCategoryAddModal from './components/add-blog-category.modal';

const BlogCategoryListPage = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_BLOG_CATEGORY });
    const { setModal } = useModal();
    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Blog Categories</h2>
            <Button type="primary" onClick={() => setModal(MODAL_ENUMS.OPEN_ADD_BLOG_CATEGORY_MODAL)}>Add Blog Category</Button>
        </Flex>
    )

    return (
        <Card title={title}>
            <DynamicTable
                columns={BlogCategoryColumnRender()}
                dataSource={(data as any)?.blogCategoryGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={(data as any)?.blogCategoryGetAll?.pagination?.total}
                pageSize={page}
            />
            <BlogCategoryUpdateModal />
            <BlogCategoryAddModal />
        </Card>
    )
}

export default BlogCategoryListPage
