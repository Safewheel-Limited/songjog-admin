"use client";

import { getCookies } from "@/common/utils";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

function makeClient() {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_BASE_API_URL as string,
    });
    const uploadLink = createUploadLink({ uri: process.env.NEXT_PUBLIC_BASE_API_URL as string, });
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
                    authLink.concat(uploadLink).concat(httpLink),
                ])
                : authLink.concat(uploadLink).concat(httpLink),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={() => makeClient()}>
            {children}
        </ApolloNextAppProvider>
    );
}