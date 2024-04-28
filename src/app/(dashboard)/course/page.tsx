"use client";

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import DynamicTable from '@/components/ui/DynamicTable';

import { Button, Card, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import CourseColumnRenderer from './_component/course.column';
import { GET_ALL_COURSE } from './graphql';

const CourseLists = () => {
  const { data, loading, page, onPaginationChange } = useGetMultipleDataWithDynamicQuery({ query: GET_ALL_COURSE });
  const router = useRouter();
  const title = (
    <Flex justify="space-between" align='center'>
      <h2>All Courses</h2>
      <Button type="primary" onClick={() => router.push("/course/add-course")}>Add New Course</Button>
    </Flex>
  )
  return (
    <Card title={title}>
      <DynamicTable
        columns={CourseColumnRenderer()}
        dataSource={data?.courseGetAll?.data}
        loading={loading}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        showPagination={true}
        totalPages={data?.courseGetAll?.pagination?.total}
        pageSize={page}
      />
    </Card>
  )
}

export default CourseLists;