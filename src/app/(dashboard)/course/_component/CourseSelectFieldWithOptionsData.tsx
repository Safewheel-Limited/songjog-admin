
import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import FormSelectField from '@/components/Forms/FormSelectField'
import React, { useEffect, useState } from 'react'
import { GET_ALL_LESSON } from '../../lesson/graphql/lesson.query';

const CourseSelectFieldWithOptionsData = () => {
    const [options, SetOptions] = useState([]);
    const { data } = useGetMultipleDataWithDynamicQuery({
        query: GET_ALL_LESSON,
    });

    useEffect(() => {
        if (data?.lessonGetAll?.data?.length) {
            const modifyOptions = data?.lessonGetAll?.data?.map((lesson: any) => ({
                value: lesson.id,
                label: lesson.lesson_title
            }))
            SetOptions(modifyOptions);
        }
    }, [data?.lessonGetAll?.data])

    return (
        <FormSelectField
            mode="multiple"
            name="lessonIds"
            options={options}
            placeholder="Select Lessons"
            label="Select Lessons"
            required
        />
    )
}

export default CourseSelectFieldWithOptionsData