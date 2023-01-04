import { gql } from '@apollo/client';

export const LOAD_TRANSACTIONS_BY_IDS_QUERY = gql`
query loadTransactionsByIDs($token: String!, $transactionIDs: [String]!) {
  loadTransactionsByIDs(token: $token, transactionIDs: $transactionIDs) {
    status
    transactions {
      type
      date
      accountSource
      accountDestination
      category
      amount
      description
      _id
    }
  }
}
`;

