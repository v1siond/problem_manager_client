import React, {Component} from 'react'
import { Mutation } from "react-apollo"
import {LOGIN_MUTATION, CREATE_USER_MUTATION} from '../graphql/mutations'
import { withRouter } from 'react-router-dom'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length
  }

  componentDidMount () {
    if (localStorage.getItem('authUserToken')) {
      alert('You already have a open session')
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <Mutation mutation={CREATE_USER_MUTATION}>
        {(createUser, { data }) => {
          return (
            <Mutation mutation={LOGIN_MUTATION}>
              {(login, { data }) => {
                return (
                  <section className="basic-form">
                    <article className="form-fieldset">
                      <label>Name</label>
                      <input
                        id="name"
                        className="input"
                        autoFocus
                        type="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </article>
                    <article className="form-fieldset">
                      <label>Email</label>
                      <input
                        id="email"
                        className="input"
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </article>
                    <article className="form-fieldset">
                      <label>Password</label>
                      <input
                        id="password"
                        className="input"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                        required
                      />
                    </article>
                    <button
                      className="rounded-button -positive -alone"
                      disabled={!this.validateForm()}
                      onClick={() => {
                        createUser({ variables: { input: {name: this.state.name, email: this.state.email, password: this.state.password} } }).then(
                          res => {
                            if (res.data.createUser) {
                              alert('User created successfully')
                              login({ variables: { input: {email: this.state.email, password: this.state.password} } }).then(
                                res => {
                                  if (res.data.login) {
                                    localStorage.setItem('authUserToken', res.data.login.token)
                                    this.props.handleLogin(res.data.login.token)
                                    this.props.history.push('/')
                                  } else alert('Error login')
                                }
                              )
                            } else alert('Error trying to signup user')
                          }
                        )
                      }}
                    >
                      Signup
                    </button>
                  </section>
                )
              }}
            </Mutation>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(Signup)