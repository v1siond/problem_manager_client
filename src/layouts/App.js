import React, {createContext} from 'react'
import '../styles/App.css'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Login from './Login'
import Signup from './Signup'
import Header from '../components/Header'
import Question from '../pages/Question'
import Sidebar from '../components/Sidebar'

const UserContext = createContext()

const initialState = {
  authUserToken: localStorage.getItem('authUserToken') || false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'logUser':
      return {
        ...state,
        authUserToken: action.payload
      }
    default:
      return state
  }
}

const UserContextProvider = ({ ...props }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <UserContext.Provider
      value={ {
        ...state,
        handleLogin: (token) =>
          dispatch({ type: 'logUser', payload: token })
      } }
    >
      {props.children}
    </UserContext.Provider>
  )
}

const App = () => {
  return (
    <UserContextProvider>
      <UserContext.Consumer>
        { user => (
          <Router>
            {
              user.authUserToken ? (
                <main className="main-wrapper">
                  <Header handleLogout={user.handleLogin}/>
                  <section className="question-wrapper">
                    <Sidebar />
                    <Route exact path="/question/:id?" component={Question} />
                  </section>
                </main>
              ) : (
                <main className="main-wrapper -logout">
                  <Redirect to="/Login" component={Login} />
                  <Route exact path="/login" component={() => {
                    return <Login handleLogin={user.handleLogin} />
                  }} />
                  <Route exact path="/signup" component={() => {
                    return <Signup handleLogin={user.handleLogin} />
                  }} />
                </main>
              )
            }
          </Router>
        )
        }
      </UserContext.Consumer>
    </UserContextProvider>
  )
}

export default App
