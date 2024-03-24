"use client";

import { Table } from "antd";

type UMTableProps = {
    loading?: boolean;
    key?: string;
    columns: any;
    dataSource: any;
    pageSize?: number;
    totalPages?: number;
    showSizeChanger?: boolean;
    onPaginationChange?: (page: number, pageSize: number) => void;
    onTableChange?: (pagination: any, filter: any, sorter: any) => void;
    showPagination?: boolean;
};

const DynamicTable = ({
    loading = false,
    columns,
    dataSource,
    key,
    pageSize,
    totalPages,
    showSizeChanger = true,
    onPaginationChange,
    onTableChange,
    showPagination = true,
}: UMTableProps) => {
    const paginationConfig = showPagination
        ? {
            total: totalPages,
            current: pageSize,
            pageSizeOptions: [5, 10, 20],
            showSizeChanger: showSizeChanger,
            onChange: onPaginationChange,
        }
        : false;

    return (
        <Table
            key={key}
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={paginationConfig}
            onChange={onTableChange}
        />
    );
};

export default DynamicTable;
