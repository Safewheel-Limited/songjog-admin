"use client";

import { getCookies } from "@/common/utils";
import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { onError } from "@apollo/client/link/error";

function makeClient() {

    // error handling  
    const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        if (networkError) console.error(`[Network error]: ${networkError}`);
    });

    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_BASE_API_URL as string,
    });

    const authLink = setContext((_, { headers }) => {
        const token = getCookies();
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token ? token : ""}`,
                "secret-key": process.env.NEXT_PUBLIC_SECRET_KEY,
            }
        }
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === "undefined"
                ? ApolloLink.from([
                    new SSRMultipartLink({
                        stripDefer: true,
                    }),
                    errorLink,
                    authLink.concat(httpLink),
                ])
                : errorLink.concat(authLink.concat(httpLink)),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={() => makeClient()}>
            {children}
        </ApolloNextAppProvider>
    );
}