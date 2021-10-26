import React, {useState} from 'react'

const Item = ({item, columns, onColumnChange, onEditFormSubmit, onDelete}) => {

  const [isEditing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editFormState, setEditFormState] = React.useState(item)

  const handleSubmit = function (e) {
    setEditing(false)
    onEditFormSubmit(editFormState)
    e.preventDefault()
  }

  const handleInputChange = (event) => {
    setEditFormState({
      ...editFormState,
      [event.target.name]: event.target.value
    });
  }

  const viewItemTemplate = (
    <div className="todo-item">
      <h3 className="todo-item__title">{item.title}</h3>
      <p className="todo-item__description">{item.description}</p>
      <div className="todo-visually-hidden">
        <label htmlFor={`select-${item.id}`} className="todo-item__label">Change column:</label>
        <select id={`select-${item.id}`} value={item.column} onChange={(e) => onColumnChange(item, e.target.value)} className="todo-item__select">
          { columns.map((column) => (
            <option value={column.id} key={column.id}>{column.title}</option>
          )) }
        </select>
      </div>
      {confirmDelete
        ? <div className="todo-item__actions">
          <p>Are you sure you want to delete this item?</p>
          <button onClick={() => onDelete(item)} className="todo-item__action-button">Yes, delete</button>
          <button onClick={() => setConfirmDelete(false)} className="todo-item__action-button">Cancel</button>
        </div>
        : <div className="todo-item__actions">
          <button onClick={() => setEditing(true)} className="todo-item__action-button">Edit</button>
          <button onClick={() => setConfirmDelete(true)} className="todo-item__action-button">Delete</button>
        </div>
      }

    </div>
  );

  const editItemTemplate = (
    <div className="todo-item">
      <form onSubmit={handleSubmit} className="todo-form">
        <fieldset className="todo-fieldset">
          <legend className="todo-legend">Editing</legend>
          <div className="todo-form-group">
            <label htmlFor={`title-${item.id}`} className="todo-label">
              Title
            </label>
            <input type="text" id={`title-${item.id}`}  name="title" value={editFormState.title} className="todo-input" onChange={handleInputChange}  />
          </div>
          <div className="todo-form-group">
            <label htmlFor={`description-${item.id}`} className="todo-label">
              Description
            </label>
            <input type="text"  id={`description-${item.id}`} name="description" value={editFormState.description} className="todo-input" onChange={handleInputChange}  />
          </div>
          <div className="todo-form-group">
            <label htmlFor={`description-${item.id}`} className="todo-label">
              Column
            </label>
            <select id={`select-${item.id}`} name="column" value={editFormState.column} className="todo-select" onChange={handleInputChange}>
              { columns.map((column) => (
                <option value={column.id} key={column.id}>{column.title}</option>
              )) }
            </select>
          </div>
        </fieldset>
        <div className="todo-item__actions">
          <button type="submit" className="todo-item__action-button">Save</button>
          <button className="todo-item__action-button" onClick={(e) => {setEditing(false); e.preventDefault()}}>Cancel</button>
        </div>
      </form>
    </div>
  );

  return isEditing ? editItemTemplate : viewItemTemplate
}

export default Item