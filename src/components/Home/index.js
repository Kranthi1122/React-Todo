import {Component} from 'react'

import Cookies from 'js-cookie'

import {v4 as uuidv4} from 'uuid'

import TodoItems from '../TodoItems'

import './index.css'

class Home extends Component {
  state = {input: '', todoLocal: []}

  componentDidMount() {
    this.getPreviousTodoList()
  }

  getPreviousTodoList = () => {
    const todoList = localStorage.getItem('todoList')
    const parsedTodoList = JSON.parse(todoList)
    if (todoList === null) {
      const name = []
      this.setState({todoLocal: name})
    } else {
      const name = parsedTodoList
      this.setState({todoLocal: name})
    }
  }

  updateInput = e => {
    this.setState({input: e.target.value})
  }

  onChange = e => {
    this.setState({input: e.target.value})
  }

  addTask = e => {
    e.preventDefault()
    const {input, todoLocal} = this.state
    if (input === '') {
      alert('Enter Valid Text')
      return
    }
    const objectList = {
      text: input,
      id: uuidv4(),
      checked: false,
    }
    // const localList = this.getTodoList()
    todoLocal.push(objectList)
    this.setState({todoLocal, input: ''})
  }

  isChecked = (id, condition) => {
    const {todoLocal} = this.state
    const results = todoLocal.map(element => {
      if (element.id === id) {
        const maf = {
          id,
          text: element.text,
          checked: condition,
        }
        return maf
      }
      return element
    })
    console.log(results)
    this.setState({todoLocal: results})
  }

  saveStorage = () => {
    const {todoLocal} = this.state
    localStorage.setItem('todoList', JSON.stringify(todoLocal))
  }

  onDelete = id => {
    const todoList = localStorage.getItem('todoList')
    const parsedTodoList = JSON.parse(todoList)
    const result = parsedTodoList.filter(each => id !== each.id)
    localStorage.setItem('todoList', JSON.stringify(result))
    this.setState({todoLocal: result})
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {input, todoLocal} = this.state
    return (
      <>
        <div className="todos-bg-container">
          <div className="container">
            <div>
              <div>
                <div className="bgbg">
                  <h1 className="todos-heading">Todos</h1>
                  <button
                    type="button"
                    className="button king"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </div>

                <h1 className="create-task-heading">
                  Create{' '}
                  <span className="create-task-heading-subpart">Task</span>
                </h1>
                <input
                  type="text"
                  id="todoUserInput"
                  className="todo-user-input"
                  placeholder="What needs to be done?"
                  onChange={this.updateInput}
                  value={input}
                />
                <button
                  type="button"
                  className="button"
                  id="addTodoButton"
                  onClick={this.addTask}
                >
                  Add
                </button>
                <h1 className="todo-items-heading">
                  My <span className="todo-items-heading-subpart">Tasks</span>
                </h1>
                <ul className="todo-items-container" id="todoItemsContainer">
                  {todoLocal.map(each => (
                    <TodoItems
                      key={each.id}
                      list={each}
                      propchecked={this.isChecked}
                      onDelete={this.onDelete}
                    />
                  ))}
                </ul>
                <button
                  type="button"
                  className="button"
                  id="saveTodoButton"
                  onClick={this.saveStorage}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
