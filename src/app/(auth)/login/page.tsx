"use client";

// internal imports
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_POKEMONS } from './graphql';

export const revalidate = 5;

const Login = () => {
    const { data, error } = useSuspenseQuery(GET_POKEMONS);

    return (
        <div>Login</div>
    )
}

export default Login;