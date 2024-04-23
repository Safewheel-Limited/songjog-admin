"use client";

import CarePackageColumnRenderer from '../_comonents/care-package.column';
import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import DynamicTable from '@/components/ui/DynamicTable';
import { GET_ALL_CARE_PACKAGES } from '../../graphql';
import { Button, Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';

const CarePackageLists = () => {
    const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_CARE_PACKAGES });
    const router = useRouter();
    const title = (
        <Flex justify="space-between" align='center'>
            <h2>All Care packages</h2>
            <Button type="primary" onClick={() => router.push("/care-package/add-care-package")}>Add Care Package</Button>
        </Flex>
    )
    return (
        <Card title={title}>
            <DynamicTable
                columns={CarePackageColumnRenderer()}
                dataSource={data?.carePackageGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={data?.carePackageGetAll?.pagination?.total}
                pageSize={page}
            />
        </Card>
    )
}

export default CarePackageLists;