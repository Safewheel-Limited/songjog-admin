import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  HttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";
import { authKey } from "../constants";

export const { getClient } = registerApolloClient(() => {
  const cookieStore = cookies();
  const token = cookieStore.get(authKey)?.value;

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BASE_API_URL as string,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token ? token : ""}`,
        "secret-key": process.env.NEXT_PUBLIC_SECRET_KEY,
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink.concat(httpLink)]),
  });
});
