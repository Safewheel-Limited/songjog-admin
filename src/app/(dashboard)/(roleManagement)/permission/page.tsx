"use client";

import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_PERMISSION } from './graphql/permission.query';
import DynamicTable from '@/components/ui/DynamicTable';
import ColumnRenderer from './_components/permission.column';
import PermissionUpdateModal from './_components/permission-update.modal';
import PermissionAccessHolderModal from './_components/permission-access-holder.modal';
import PermissionHeader from './_components/permission-header';
import AddPermissionModal from './_components/add-permission.modal';
import { lastWhitSpaceTrim } from '@/common/utils';
import { searchPermisionType } from '../types';

const AllPermissions = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const [search, setSearch] = useState<searchPermisionType>({
        name: "",
    });

    const { data, loading } = useQuery(GET_ALL_PERMISSION, {
        variables: {
            paginationQuery: {
                limit: limit,
                page: page
            },
            filterQuery: {
                name: lastWhitSpaceTrim(search.name),
            },
        },
    })

    const onPaginationChange = (current: number, pageSize: number) => {
        setPage(current);
        setLimit(pageSize);
    };

    return (
        <>
            <PermissionHeader setSearch={setSearch} />
            <PermissionAccessHolderModal />
            <AddPermissionModal />
            <PermissionUpdateModal />
            <DynamicTable
                columns={ColumnRenderer()}
                dataSource={data?.permissionGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={data?.permissionGetAll?.pagination?.total}
                pageSize={page}
            />
        </>
    )
}

export default AllPermissions;