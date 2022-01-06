import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      ok
      user {
        name
      }
      error
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($name: String!, $password: String!) {
    loginUser(name: $name, password: $password) {
      ok
      user {
        name
        scores {
          game
          score
        }
      }
      error
    }
  }
`;

export const UPDATE_MUTATION = gql`
  mutation UpdateMutation($name: String!, $game: String!, $score: Int!) {
    updateUser(name: $name, game: $game, score: $score) {
      ok
      user {
        name
        scores {
          game
          score
        }
      }
      error
    }
  }
`;
