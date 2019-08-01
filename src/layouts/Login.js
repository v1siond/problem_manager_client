import React, {Component} from 'react'
import { Mutation } from "react-apollo"
import {LOGIN_MUTATION} from '../graphql/mutations'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  componentDidMount () {
    if (localStorage.getItem('authUserToken')) {
      alert('You already have a open session')
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(login, { data, loading, error }) => {
          return (
            <section className="basic-form">
              <div className="form-fieldset">
                <label className="form-label">Email</label>
                <input
                  id="email"
                  className="input"
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-fieldset">
                <label className="form-label">Password</label>
                <input
                  id="password"
                  className="input"
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  required
                />
              </div>
              <Link className="form-link" to="/signup">Don't have an account?</Link>
              <button
                className="rounded-button -positive -alone"
                disabled={!this.validateForm()}
                onClick={() => {
                  login({ variables: { input: {email: this.state.email, password: this.state.password} } }).then(
                    res => {
                      if (res.data.login) {
                        localStorage.setItem('authUserToken', res.data.login.token)
                        this.props.handleLogin(res.data.login.token)
                        this.props.history.push('/')
                      } else alert('Wrong email or password')
                    }
                  )
                }}
              >
                Login
              </button>
              {loading && <p>loading...</p>}
              {error && <p>{error.message}</p>}
            </section>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(Login)