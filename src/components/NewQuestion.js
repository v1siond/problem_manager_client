import React, {Component} from 'react'
import { Mutation } from "react-apollo"
import {CREATE_QUESTION_MUTATION} from '../graphql/mutations'
import {QUESTIONS_QUERY} from '../graphql/queries'
import { withRouter } from 'react-router-dom'
import letters from '../helpers/letters'
class NewQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      body: "",
      options: []
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

  addOption () {
    const options = [...this.state.options]
    options.push({ body: '', correctAnswer: false })
    this.setState({options: options})
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

  removeOption (i) {
    const options = [...this.state.options]
    options.splice(i, 1)
    this.setState({options: options})
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.body.length > 0 && this.state.options.length > 0
  }

  render () {
    return (
      <Mutation mutation={CREATE_QUESTION_MUTATION} refetchQueries={[{ query: QUESTIONS_QUERY }]}  >
        {(createQuestion, { data, loading, error }) => {
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
                return (
                  <div key={`${field}-${index}`} className="form-fieldset">
                    <div className="option-wrapper">
                      <label className="form-label">
                        Option {letters[index + 1]}
                        {field.correctAnswer && <span className="positive-text">(Current Answer)</span>}
                      </label>
                      <div>
                        {!field.correctAnswer && (
                          <button id={`set-correct-${index}`} className="option-button -positive" onClick={() => this.setCorrect(index)}>
                            Set correct answer
                          </button>
                        )}
                        <button className="option-button -negative" onClick={() => this.removeOption(index)}>
                          Delete option
                        </button>
                      </div>
                    </div>
                    <input
                      id={`option-${index}`}
                      type="text"
                      className="input"
                      value={field.value}
                      placeholder="Enter text"
                      onChange={e => this.handleOptionChange(index, e)}
                    />
                  </div>
                );
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
                  createQuestion({ variables: { input: {title: this.state.title, body: this.state.body, options: this.state.options} } }).then(
                    res => {
                      if (res.data.createQuestion) {
                        const question = res.data.createQuestion.question
                        alert('Question created successfully')
                        this.props.history.push(`/question/${question.id}`)
                      }
                    }
                  )
                }}
              >
                Save
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

export default withRouter(NewQuestion)