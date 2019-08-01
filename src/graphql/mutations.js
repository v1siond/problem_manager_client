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
        options {
          id
          body
          correctAnswer
        }
      }
    }
  }
`

export const EDIT_QUESTION_MUTATION = gql`
  mutation editQuestion($input: EditQuestionInput!) {
    editQuestion(input: $input) {
      question {
        id
        body
        title
        options {
          id
          body
          correctAnswer
        }
      }
    }
  }
`

export const DELETE_QUESTION_MUTATION = gql`
  mutation deleteQuestion($input: DeleteQuestionInput!) {
    deleteQuestion(input: $input) {
      errors
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
  ADD_OPTION_MUTATION,
  DELETE_QUESTION_MUTATION
}