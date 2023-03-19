import {MdDelete} from 'react-icons/md'

import './index.css'

const TodoItems = props => {
  const {list, propchecked, onDelete} = props
  const {text, checked, id} = list

  const checkOnChange = e => {
    propchecked(id, e.target.checked)
  }

  const deleteTodo = () => {
    onDelete(id)
  }

  const linethrough = checked ? 'checked' : ''
  return (
    <div className="each">
      <input
        checked={checked}
        type="checkbox"
        className="checkbox-input"
        id={id}
        onChange={checkOnChange}
      />
      <div className="label-container">
        <label htmlFor={id} className={linethrough}>
          {text}
        </label>
        <MdDelete className="delete" onClick={deleteTodo} />
      </div>
    </div>
  )
}
export default TodoItems
