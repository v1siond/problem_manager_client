import React, {createContext} from 'react'
import '../styles/App.css'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

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
      };
    default:
      return state;
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
                <div>
                  <Route exact path="/" component={Home} />
                </div>
              ) : (
                <div>
                  <Redirect to="/Login" component={Login} />
                  <Route exact path="/login" component={() => {
                    return <Login handleLogin={user.handleLogin} />
                  }} />
                  <Route exact path="/signup" component={() => {
                    return <Signup handleLogin={user.handleLogin} />
                  }} />
                </div>
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
