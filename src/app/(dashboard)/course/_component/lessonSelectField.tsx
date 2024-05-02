
import { useGetMultipleDataWithDynamicQuery } from '@/common/hooks';
import FormSelectField from '@/components/Forms/FormSelectField'
import React, { useEffect, useState } from 'react'
import { GET_ALL_LESSON } from '../../lesson/graphql/lesson.query';

const LessonSelectField = () => {
    const [options, SetOptions] = useState([]);
    const { data } = useGetMultipleDataWithDynamicQuery({
        query: GET_ALL_LESSON,
    });

    useEffect(() => {
        if ((data as any)?.lessonGetAll?.data?.length) {
            const modifyOptions = (data as any)?.lessonGetAll?.data?.map((lesson: any) => ({
                value: lesson.id,
                label: lesson.lesson_title
            }))
            SetOptions(modifyOptions);
        }
    }, [data])

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

export default LessonSelectField