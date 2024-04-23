import DynamicTable from '@/components/ui/DynamicTable'
import React from 'react'
import GalleryColumnRender from './gallery.column'
import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import { GALLERY_GET_ALL } from '../graphql/gallery.query';

const GalleryTable = () => {
    const { data, limit, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GALLERY_GET_ALL });

    return (
        <DynamicTable
            columns={GalleryColumnRender()}
            dataSource={data?.galleryGetAll?.data}
            loading={loading}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
            totalPages={data?.galleryGetAll?.pagination?.total}
            pageSize={page}
        />
    )
}

export default GalleryTable