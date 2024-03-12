import { getClient } from '@/common/lib';
import { GET_POKEMONS } from '../login/graphql';

export const invalidate = 10;

const Signup = async () => {
    const { data } = await getClient().query({ query: GET_POKEMONS });
    return (
        <div>Signup</div>
    )
}

export default Signup