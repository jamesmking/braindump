import React, {useState, useEffect} from 'react'
import Item from './components/item/Item'
import './app.scss'

const initialColumns = [
  {
    id: 1,
    title: 'Backlog'
  },
  {
    id: 2,
    title: 'In progress'
  },
  {
    id: 3,
    title: 'Complete'
  }
]

const initialFormState = {
  title: "",
  description: ""
}

const ToDoApp = () => {

  const initialToDoList = JSON.parse(localStorage.getItem('todoLIST')) || [];

  const [formState, setFormState] = React.useState(initialFormState)

  const [todoList, setTodoList] = useState(initialToDoList)
  const [columns, setColumns] = useState(initialColumns)

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  }

  const handleColumnChange = (item, newColumnId) => {
    const newToDoList = todoList.map(listItem => (listItem.id === item.id ? { ...listItem, column: parseInt(newColumnId) } : listItem));
    setTodoList(newToDoList)
  }

  const handleEdit = (item) => {
    const newToDoList = todoList.map(listItem => (listItem.id === item.id ? { ...item, column: parseInt(item.column) } : listItem));
    setTodoList(newToDoList)
  }

  const handleDelete = (item) => {
    const newToDoList = todoList.filter(listItem => (listItem.id !== item.id))
    setTodoList(newToDoList)
  }

  const handleFormSubmit = (event) => {
    const newToDoList = [...todoList]
    event.preventDefault()
    if (!formState.title) {
      return
    }
    const newItem = {
      id: Date.now(),
      title: formState.title,
      description: formState.description,
      column: 1,
      completed: false,
      editing: false
    }
    newToDoList.push(newItem)
    setFormState(initialFormState);
    setTodoList(newToDoList)
  }

  useEffect(() => {
    localStorage.setItem('todoLIST', JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className="todo-wrap">
      <Form formState={formState} onSubmit={handleFormSubmit} onInputChange={handleInputChange} />
      <Columns columns={columns} todoList={todoList} handleColumnChange={handleColumnChange} handleEdit={handleEdit} handleDelete={handleDelete}>
      </Columns>
    </div>
  )
}

const Columns = ({columns, todoList, handleColumnChange, handleDelete, handleEdit, handleEditStateChange}) => (
  <div className="todo-columns">
    { columns.map((column) => (
      <div className="todo-column" key={column.id}>
        <h2 className="todo-column__heading">{column.title}</h2>
        <List list={todoList} columns={columns} handleColumnChange={handleColumnChange} handleDelete={handleDelete} handleEdit={handleEdit} handleEditStateChange={handleEditStateChange} columnId={column.id} />
      </div>
    ))
    }
  </div>
)

const Form = ({formState, onInputChange, onSubmit}) => (
  <form onSubmit={onSubmit} className="todo-form">
    <fieldset className="todo-fieldset">
      <legend className="todo-legend">Enter your new todo item</legend>
      <div className="todo-form-group">
        <label htmlFor="title" className="todo-label">
          Title
        </label>
        <input type="text" id="title" name="title" value={formState.title} onChange={onInputChange} className="todo-input" />
      </div>
      <div className="todo-form-group">
        <label htmlFor="description" className="todo-label">
          Description
        </label>
        <input type="text"  id="description" name="description" value={formState.description} onChange={onInputChange} className="todo-input" />
      </div>
      <button type="submit" className="todo-button">Add</button>
    </fieldset>
  </form>
)

const List = ({list, columns, handleColumnChange, handleEdit, handleDelete, columnId}) => {
  return (
  <ul className="todo-column__list">
    { list.map((item) => (
        item.column === columnId &&
        <li key={item.id} className="todo-column__list-item">
          <Item item={item} columns={columns} onColumnChange={handleColumnChange} onEditFormSubmit={handleEdit} onDelete={handleDelete} />
        </li>
      )
    )}
  </ul>
  )
}





export default ToDoApp;
