import gql from 'graphql-tag'

export const QUESTIONS_QUERY = gql`
  query {
    questions {
      id
      title
    }
  }
`

export const QUESTION_QUERY = gql`
  query question($id: ID!) {
    question(id: $id) {
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
`

export default {
  QUESTIONS_QUERY,
  QUESTION_QUERY
}