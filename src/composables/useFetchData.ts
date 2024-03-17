import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const useFetchData = () => {
  const getAllUsers = () => {
    const getDataQuery = gql`
      query getUsers {
        allUsers {
          id
          name
          image
          balance
          description
          contacts
        }
      }
    `
    return useQuery(getDataQuery)
  }

  const getUserById = (id: number) => {
    const getDataQuery = gql`
      query getUserById($id: ID!) {
        user(id: $id) {
          id
          name
          image
          balance
          description
          contacts
        }
      }
    `
    return useQuery(getDataQuery, { id })
  }

  const getAllTransactions = (userId: number) => {
    const getDataQuery = gql`
      query getTransactions($userId: ID!) {
        allTransactions(userId: $userId) {
          id
          amount
          debit
          message
          sender {
            id
            name
          }
          recipient {
            id
            name
          }
          created_at
        }
      }
    `
    return useQuery(getDataQuery, { userId })
  }

  const getTransactionById = (id: number) => {
    const getDataQuery = gql`
      query getTransactionById($id: ID!) {
        transaction(id: $id) {
          id
          amount
          debit
          message
          sender {
            id
            name
          }
          recipient {
            id
            name
          }
          created_at
        }
      }
    `
    return useQuery(getDataQuery, { id })
  }

  const getUserTransactions = (userId: number) => {
    const getDataQuery = gql`
      query getUserTransactions($userId: ID!) {
        allUserTransactions(userId: $userId) {
          id
          amount
          debit
          message
          sender {
            id
            name
          }
          recipient {
            id
            name
          }
          created_at
        }
      }
    `
    return useQuery(getDataQuery, { userId })
  }

  const allUserContacts = (userId: number) => {
    const getDataQuery = gql`
      query getUserContacts($userId: ID!) {
        allUserContacts(userId: $userId) {
          id
          name
          image
          description
        }
      }
    `
    const transactions = useQuery(getDataQuery, { userId })

    return transactions
  }

  return {
    getAllUsers,
    getUserById,
    getUserTransactions,
    getTransactionById,
    getAllTransactions,
    allUserContacts
  }
}

export default useFetchData
