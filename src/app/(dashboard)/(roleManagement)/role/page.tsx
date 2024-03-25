"use client";

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import DynamicTable from '@/components/ui/DynamicTable'
import { GET_ALL_ROLE_ACCESS } from './graphql/role.query';
import { lastWhitSpaceTrim } from '@/common/utils';
import RoleColumnRenderer from './_components/role.column';
import { searchRoleType } from './types';
import RoleHeader from './_components/role-header';
import AddRoleModal from './_components/add-role.modal';
import { useModal } from '@/common/store';
import EditRoleModal from './_components/edit-role.modal';
import RoleAccessHolderModal from './_components/role-access-holder.modal';

const AllRoles = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const { modal } = useModal();
    const [search, setSearch] = useState<searchRoleType>({
        name: "",
    });

    const { data, loading } = useQuery(GET_ALL_ROLE_ACCESS, {
        variables: {
            paginationQuery: {
                limit: limit,
                page: page,
            },
            filterQuery: {
                name: lastWhitSpaceTrim(search.name),
            },
        },
    });

    const onPaginationChange = (current: number, pageSize: number) => {
        setPage(current);
        setLimit(pageSize);
    };
    return (
        <>
            <RoleHeader setSearch={setSearch} />
            <AddRoleModal />
            <EditRoleModal />
            <RoleAccessHolderModal />
            <DynamicTable
                columns={RoleColumnRenderer()}
                dataSource={data?.roleAccessGetAll?.data}
                loading={loading}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                showPagination={true}
                totalPages={data?.roleAccessGetAll?.pagination?.total}
                pageSize={page}
            />
        </>
    )
}

export default AllRoles