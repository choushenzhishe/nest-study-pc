import {gql} from '@apollo/client'

export const SEND_CODE_MESSAGE = gql`
mutation sendCodeMsg($tel:String!) {
  sendCodeMsg(tel: $tel) {
    code
    message
  }
}`

export const LOGIN = gql`
mutation login($tel:String!, $code:String!) {
  login(tel: $tel, code: $code) {
    code
    message
    data
  }
}`

export const REGISTER = gql`
    mutation createUserByPassword($params: StudentInput!) {
        createUserByPassword(params: $params) {
            code
            message
        }
}`

export const LOGIN_BY_ACCOUNT = gql`
mutation loginByAccount($account:String!,$password:String!) {
  loginByAccount(account:$account,password:$password) {
    code
    message
    data
  }
}`