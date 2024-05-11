import { TodoItem } from "./TodoItem"

export function TodoList({todos, toggleTodo, deleteTodo}) {
    return(
        <ul className="list">
            {/* in {} means runs as javascript codes and put it down below */}
            {/* if there is no to dos, show the strings of no todos, ie short circuiting */}
            {todos.length ===0 && "No Todos"}
            {todos.map(todo => {
            return (
                <TodoItem 
                    // line 13 = line 14+15+16
                    {...todo}
                    // id = {todo.id} 
                    // completed={todo.completed} 
                    // title = {todo.title}
                    key={todo.id} 
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />)
            })} 
        </ul>
    )
}