"use client";
import { getClient } from '@/common/lib';
import { GET_ALL_PERMISSIONS } from '@/app/(auth)/login/graphql'
import { useSuspenseQuery } from '@apollo/client';

const ProfilePage = () => {
    // const { data } = await getClient().query({ query: GET_ALL_PERMISSIONS });
    const { data } = useSuspenseQuery(GET_ALL_PERMISSIONS);
    console.log("Data", data)
    return (
        <div>
            <h2>Profile page</h2>
            {/* <p>{data.permissionGetAll.data.length}</p> */}
        </div>
    )
}

export default ProfilePage