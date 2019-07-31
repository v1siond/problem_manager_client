import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`
export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        name
        email
      }
    }
  }
`

export const CREATE_QUESTION_MUTATION = gql`
  mutation createQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      question {
        id
        body
        title
      }
    }
  }
`

export const ADD_OPTION_MUTATION = gql`
  mutation createOption($input: CreateOptionInput!) {
    createOption(input: $input) {
      option {
        body
        correctAnswer
      }
    }
  }
`

export default {
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  CREATE_QUESTION_MUTATION,
  ADD_OPTION_MUTATION
}