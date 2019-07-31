import gql from 'graphql-tag'

const QUESTIONS_QUERY = gql`
  query {
    questions {
      id
      body
      title
      options {
        body
        correctAnswer
      }
    }
  }
`

export default {
  QUESTIONS_QUERY
}