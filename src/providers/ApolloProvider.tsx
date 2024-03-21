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

function makeClient() {
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
                    authLink.concat(httpLink),
                ])
                : authLink.concat(httpLink),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={() => makeClient()}>
            {children}
        </ApolloNextAppProvider>
    );
}