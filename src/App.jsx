import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import "./styles.css"
// takes in user value
import { useEffect, useState } from "react"



// this is a componenet
export default function App(){

  const [todos, setTodos] = useState(()=>{
    const localvalue = localStorage.getItem("Items")
    if (localvalue == null) return[]

    return JSON.parse(localvalue)
  })

  // run this function every time the property in the array changes
  // cannot render hooks conditionally
  // so put them at the top
  useEffect(() =>{
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])


  function addTodo(title){
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
              title,
              completed: false
            },//adding one to the end of the array
          ]
        })

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
    <NewTodoForm onSubmit = {addTodo}/>
    <h1 className="header">Todo List</h1>
    <TodoList todos = {todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>

  </>
  )
}