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
      {todos.map} 
      <li>
        <label>
          <input type="checkbox" />
          Item 1
        </label>
        <button className="btn btn-danger">Delete</button>
      </li>
    </ul>
  </>
  )
}