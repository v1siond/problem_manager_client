import React, {Component} from 'react'
import { Query } from "react-apollo"
import { withRouter } from 'react-router-dom'
import {QUESTION_QUERY} from '../graphql/queries'
import EditForm from './EditForm'

class EditQuestion extends Component {
  render () {
    return (
      <Query fetchPolicy="network-only"  query={QUESTION_QUERY} variables={{id: this.props.id}}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          if (data.question) {
            const question = data.question
            return <EditForm question={question} />
          } else return null
        }}
      </Query>
    )
  }
}

export default withRouter(EditQuestion)