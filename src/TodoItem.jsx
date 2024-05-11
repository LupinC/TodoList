export function TodoItem({completed, id, title, toggleTodo, deleteTodo}){
    return(
        // each element at top should have a unique property
        // because sometimes I only want to edit or change particular one of the todos
        <li >
            <label>
                <input  type="checkbox" 
                        checked={completed}
                        onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title}
            </label>
            <button 
                // !!! do not remove the ()= the function calling
                onClick={()=> deleteTodo(id)}
                className="btn btn-danger">Delete
            </button>  
        </li>
    )
}