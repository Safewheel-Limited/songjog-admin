import { GET_ALL_PERMISSIONS } from '@/app/(auth)/login/graphql'
import { getClient } from '@/common/lib';

const ProfilePage = async () => {
    const { data } = await getClient().query({ query: GET_ALL_PERMISSIONS });
    return (
        <div>
            <h2>Profile page</h2>
            <p>{data.permissionGetAll.data.length}</p>
        </div>
    )
}

export default ProfilePage