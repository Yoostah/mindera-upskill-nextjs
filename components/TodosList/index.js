import classes from "./TodosList.module.css"
import Link from "next/link"
import { markAsDone } from "../../lib/mark-as-done"
import { useRouter } from "next/router"

const TodosList = ({ todos }) => {
    const router = useRouter()
    return (
        <div>
            {
                todos.map((todo) => (
                    <div key={todo.id} className={classes.container}>
                        <Link href={todo.id} className={classes.title}>{todo.title}</Link>
                        <p>{todo.description}</p>
                        <button 
                        className={todo.completed ? classes.completedButton : classes.button}
                        onClick={()=> markAsDone(router, todo.id)}
                        >{todo.completed ? "Done" : "Mark as Done"}</button>
                    </div>
                ))
            }
        </div>
    )
}

export default TodosList