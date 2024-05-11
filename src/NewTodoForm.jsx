import { useState } from "react"


export function NewTodoForm({onSubmit}){
  // to make it a property   ^, and we need {}
  // newItem-> array
  // setNewItem -> function
  // new item is a state variable that you cannot update
  const [newItem, setNewItem] = useState("")
  // setNewItem() here will cause an infinite loop, it will be called to render the whole page blow again and again

    function handleSubmit(e){
        e.preventDefault()//prevent page from refreshing
    
        if (newItem === "") return

        onSubmit(newItem)
    
        // to check: console.log(todos)
        setNewItem("")
      }


    return (    
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
  )
}