import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons {
    pokemons(limit: 1, offset: 1) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;
