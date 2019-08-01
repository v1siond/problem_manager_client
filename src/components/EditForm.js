import React, {Component} from 'react'
import { Mutation } from "react-apollo"
import { withRouter } from 'react-router-dom'
import {QUESTIONS_QUERY, QUESTION_QUERY} from '../graphql/queries'
import {EDIT_QUESTION_MUTATION, DELETE_QUESTION_MUTATION} from '../graphql/mutations'
import OptionInput from './OptionInput'

class NewQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questionId: props.question.id,
      title: props.question.title,
      body: props.question.body,
      options: [],
      newOptions: [],
      deleteOptions: []
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleOptionChange = (i, event) => {
    const options = [...this.state.options]
    options[i].body = event.target.value
    this.setState({options: options})
  }

  handleNewOptionChange = (i, event) => {
    const newOptions = [...this.state.newOptions]
    newOptions[i].body = event.target.value
    this.setState({newOptions: newOptions})
  }

  addOption () {
    const newOptions = [...this.state.newOptions]
    newOptions.push({ body: '', correctAnswer: false })
    this.setState({newOptions: newOptions})
  }

  setCorrect (i) {
    const options = [...this.state.options]
    options.map(option => {
      if (option.correctAnswer) option.correctAnswer = false
      return true
    })
    options[i].correctAnswer = true
    this.setState({options: options})
  }

  setNewOptionCorrect (i) {
    const options = [...this.state.options]
    const newOptions = [...this.state.newOptions]
    options.map(option => {
      if (option.correctAnswer) option.correctAnswer = false
      return true
    })
    newOptions.map(option => {
      if (option.correctAnswer) option.correctAnswer = false
      return true
    })
    newOptions[i].correctAnswer = true
    this.setState({newOptions: newOptions})
  }

  removeOption (i) {
    const options = [...this.state.options]
    const deleteOptions = [...this.state.deleteOptions]
    deleteOptions.push(options[i])
    options.splice(i, 1)
    this.setState({options: options})
    this.setState({deleteOptions: deleteOptions})
  }

  removeNewOption (i) {
    const newOptions = [...this.state.newOptions]
    newOptions.splice(i, 1)
    this.setState({newOptions: newOptions})
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.body.length > 0 && this.state.options.length > 0
  }

  deleteQuestion (deleteQuestion, questionId) {
    const deleteQuestionBoolean = window.confirm('Delete question?')
    if (deleteQuestionBoolean) {
      deleteQuestion({ variables: { input: {id: questionId} } }).then(
        res => {
          if (res.data.deleteQuestion) {
            alert('Question deleted successfully')
            this.props.history.push(`/question`)
          }
        }
      )
    }
  }

  componentDidMount () {
    const options = this.props.question.options
    let OptionsWithoutTypename = []
    options.map(option => {
      OptionsWithoutTypename.push({
        id: option.id,
        body: option.body,
        correctAnswer: option.correctAnswer
      })
      return true
    })
    this.setState({options: OptionsWithoutTypename})
  }

  render () {
    return (
      <Mutation mutation={EDIT_QUESTION_MUTATION} refetchQueries={[{ query: QUESTIONS_QUERY }, { query: QUESTION_QUERY, variables: {id: this.props.question.id} }]}  >
        {(editQuestion, { data, loading, error }) => {
          return (
            <section className="question-section">
              <h2 className="title">Add Question</h2>
              <div className="form-fieldset">
                <label className="form-label">title</label>
                <input
                  id="title"
                  className="input"
                  autoFocus
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder="Problem #1.1"
                  required
                />
              </div>
              <div className="form-fieldset">
                <label className="form-label">Question</label>
                <textarea
                  id="body"
                  className="input"
                  placeholder="What is the question you're going to ask?"
                  value={this.state.body}
                  onChange={this.handleChange}
                  required
                />
              </div>
              {this.state.options.map((field, index) => {
                return <OptionInput
                  key={`${field}-${index}`}
                  field={field}
                  index={index}
                  setCorrect={this.setCorrect.bind(this)}
                  removeOption={this.removeOption.bind(this)}
                  handleOptionChange={this.handleOptionChange.bind(this)}
                />
              })}
              {this.state.newOptions.map((field, index) => {
                return <OptionInput
                  key={`${field}-${index}`}
                  field={field}
                  index={index}
                  oldOptionsLength={this.state.options.length}
                  setCorrect={this.setNewOptionCorrect.bind(this)}
                  removeOption={this.removeNewOption.bind(this)}
                  handleOptionChange={this.handleNewOptionChange.bind(this)}
                />
              })}
              <button
                className="rounded-button -inverted-primary"
                onClick={() => this.addOption()}
              >
                Add Option
              </button>
              <button
                className="rounded-button -positive"
                disabled={!this.validateForm()}
                onClick={() => {
                  editQuestion({ variables: { input: this.state } }).then(
                    res => {
                      if (res.data.editQuestion) {
                        const question = res.data.editQuestion.question
                        alert('Question updated successfully')
                        this.props.history.push(`/question/${question.id}`)
                      }
                    }
                  )
                }}
              >
                Save
              </button>
              <Mutation mutation={DELETE_QUESTION_MUTATION} refetchQueries={[{ query: QUESTIONS_QUERY }]}>
                {(deleteQuestion, { data, loading, error }) => {
                  return (
                    <button
                      className="rounded-button -negative"
                      onClick={() => {
                        this.deleteQuestion(deleteQuestion, this.state.questionId)
                      }}
                    >
                      Delete
                    </button>
                  )
                }}
              </Mutation>
              {loading && <p>loading...</p>}
              {error && <p>{error.message}</p>}
            </section>
          )
        }}
      </Mutation>
    )
  }
}

export default withRouter(NewQuestion)