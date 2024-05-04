
import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import FormSelectField from '@/components/Forms/FormSelectField'
import React, { useEffect, useState } from 'react'
import { GET_ALL_USER } from '../graphql';

const UserSelectField = () => {
    const [options, SetOptions] = useState([]);
    const { data } = useGetMultipleDataWithDynamicQuery({
        query: GET_ALL_USER,
    });

    useEffect(() => {
        if ((data as any)?.userGetAll?.data?.length) {
            const modifyOptions = (data as any)?.userGetAll?.data?.map((user: any) => ({
                value: user.uid,
                label: user.fullName
            }))
            SetOptions(modifyOptions);
        }
    }, [data])

    return (
        <FormSelectField
            name="authorId"
            options={options}
            placeholder="Select an author"
            label="Select an author"
            required
        />
    )
}

export default UserSelectField