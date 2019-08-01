import React from 'react'
import letters from '../helpers/letters'

const OptionInput = ({field, index, setCorrect, removeOption, handleOptionChange, oldOptionsLength}) => {
  return (
    <div className="form-fieldset">
      <div className="option-wrapper">
        <label className="form-label">
          Option {oldOptionsLength ? letters[oldOptionsLength + index + 1] : letters[index + 1]}
          {field.correctAnswer && <span className="positive-text">(Current Answer)</span>}
        </label>
        <div>
          {!field.correctAnswer && (
            <button id={`set-correct-${oldOptionsLength ? oldOptionsLength + index + 1 : index}`} className="option-button -positive" onClick={() => setCorrect(index)}>
              Set correct answer
            </button>
          )}
          <button id={`delete-${oldOptionsLength ? oldOptionsLength + index + 1 : index}`} className="option-button -negative" onClick={() => removeOption(index)}>
            Delete option
          </button>
        </div>
      </div>
      <input
        id={`option-${oldOptionsLength ? oldOptionsLength + index + 1 : index}`}
        type="text"
        className="input"
        value={field.body}
        placeholder="Enter text"
        onChange={e => handleOptionChange(index, e)}
      />
    </div>
  )
}

export default OptionInput