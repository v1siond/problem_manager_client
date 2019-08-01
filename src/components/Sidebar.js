import React, {Component} from 'react'
import { Query } from "react-apollo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {QUESTIONS_QUERY} from '../graphql/queries'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openSideBar: false
    }
  }

  handleResize () {
    if (window.innerWidth > 800) this.handleSidebar()
  }

  handleSidebar () {
    if (window.innerWidth < 800) this.setState({openSideBar: !this.state.openSideBar})
    else this.setState({openSideBar: true})
  }

  render () {
    const questionSelected = this.props.location.pathname.replace('/question/', '')
    return (
      <section className="sidebar-wrapper">
        { this.state.openSideBar && window.innerWidth < 800 && (
          <div className="overlay"  onClick={() => this.handleSidebar()}/>
        )}
        <aside className={this.state.openSideBar ? "sidebar show" : "sidebar"}>
          <Query query={QUESTIONS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching..</div>
              if (error) return <div>Error!</div>
              if (data.questions && data.questions.length > 0) {
                return (
                  <ul className="questions-list">
                    { data.questions.map(question => {
                      return <li key={`question-${question.id}`} className={questionSelected === question.id ? "title -question -selected" : "title -question"}><Link to={`/question/${question.id}`}>{question.title}</Link></li>
                    })}
                  </ul>
                )
              } else {
                return <h2 className="title -opaque">We have nothing here folks</h2>
              }
            }}
          </Query>
        </aside>
        <button className="rounded-button -circle -transparent-primary -sidebar-controller">
          {this.state.openSideBar ? (
            <FontAwesomeIcon icon={faAngleLeft} onClick={() => this.handleSidebar()} />
          ): (
            <FontAwesomeIcon icon={faAngleRight} onClick={() => this.handleSidebar()} />
          )}
        </button>
      </section>
    )
  }
}

export default withRouter(Sidebar)