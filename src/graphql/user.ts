import { gql } from "@apollo/client";

export const GET_USER = gql`
query getUserInfo{
  getUserInfo {
    id
    name
    account
  }
}`;