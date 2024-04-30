

import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import FormSelectField from '@/components/Forms/FormSelectField'
import React, { useEffect, useState } from 'react'
import { GET_ALL_BLOG_CATEGORY } from '../../blog-category/graphql';

const BlogCategoryField = () => {
    const [options, SetOptions] = useState([]);
    const { data } = useGetMultipleDataWithDynamicQuery({
        query: GET_ALL_BLOG_CATEGORY,
    });

    useEffect(() => {
        if ((data as any)?.blogCategoryGetAll?.data?.length) {
            const modifyOptions = (data as any)?.blogCategoryGetAll?.data?.map((category: any) => ({
                value: category.id,
                label: category.title
            }))
            SetOptions(modifyOptions);
        }
    }, [data])

    return (
        <FormSelectField
            name="blogCategoryId"
            options={options}
            placeholder="Select Blog Category"
            label="Select Blog Category"
            required
        />
    )
}

export default BlogCategoryField;