import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation userRegistration($phone: String!, $referral: String) {
    userRegistration(createUserInput: { phone: $phone, referral: $referral }) {
      user
    }
  }
`;
