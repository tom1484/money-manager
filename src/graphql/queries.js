import { gql } from '@apollo/client'

export const USER_ACCOUNT_QUERY = gql`
query getUserAccount($ID: String!) {
    userAccount(ID: $ID) {
        ID
        name
    }
}
`;