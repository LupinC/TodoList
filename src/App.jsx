import "./styles.css"
// takes in user value
import { useState } from "react"



// this is a componenet
export default function App(){
  // newItem-> array
  // setNewItem -> function
  // new item is a state variable that you cannot update
  const [newItem, setNewItem] = useState("")
  // setNewItem() here will cause an infinite loop, it will be called to render the whole page blow again and again

  const [todos, setTodos] = useState([])


  function handleSubmit(e){
    e.preventDefault()//prevent page from refreshing

    // if we have 2 settodos, it will only add one todolist
    // because the second one will overwrite the first one
    // todos => empty array
    // add one item to the end
    // at the second time, 
    // it is still an empty array
    // setTodos([
    //   ...todos, //brand new arrays
    //   {
    //     id: crypto.randomUUID(),
    //     title: newItem,
    //     completed: false
    //   },//adding one to the end of the array
    // ])

    // to address the issue we need to pass a function to set state
    setTodos((currentTodos)=>{
      return   [
        ...currentTodos, //brand new arrays
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false
        },//adding one to the end of the array
      ]
    })

    // to check console.log(todos)


    setNewItem("")
  }

  // any time you wnat to change a state, create a brand new thing like todos so that you are not mutating the current states
  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(
        todo=> {
          if (todo.id === id) {
            // dont do todo.id.completed = completed
            return { ...todo, completed}
          }

          return todo
        }
      )
    })
  }

  function deleteTodo(id){
    setTodos( currentTodos =>{
      // same => remove, not the same => keep
      return currentTodos.filter(todo => todo.id != id)
    }

    )
  }




  // return how the component look like exactly, need update? rerender
  return (
    // multiple things from a component
  <> 
    <form onSubmit = {handleSubmit} className="new-item-form">
      <div className="row">
        <label htmlFor="item">New Item</label>
        <input 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)}
          type="text" 
          id="item"/>
      </div>
      <button className="btn">add</button>
    </form>

    <h1 className="header">Todo List</h1>
     {/* list */}
    <ul className="list">
      {/* in {} means runs as javascript codes and put it down below */}
      {/* if there is no to dos, show the strings of no todos, ie short circuiting */}
      {todos.length ===0 && "No Todos"}
      {todos.map(todo => {
        return (
          // each element at top should have a unique property
          // because sometimes I only want to edit or change particular one of the todos
        <li key={todo.id}>
          <label>
            <input type="checkbox" 
            checked={todo.completed}
            onChange={e => toggleTodo(todo.id, e.target.checked())}/>
            {todo.title}
          </label>
          <button 
            // !!! do not remove the ()= the function calling
            onClick={()=> deleteTodo(todo.id)}
            className="btn btn-danger">Delete</button>
      </li>)
      })} 

    </ul>
  </>
  )
}