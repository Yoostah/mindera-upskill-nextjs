import Head from "next/head"
import {MongoClient, ObjectId} from "mongodb"

import classes from "../styles/AddNew.module.css"
import { markAsDone } from "../lib/mark-as-done"
import { useRouter } from "next/router"

const TodoDetailsPage = ({todo}) => {
    const router = useRouter
    return (
        <>
            <Head>
                <title>
                    {todo.title}
                </title>
                <meta name="description" content={`${todo.description}`} />
            </Head>
            <div>
                <h2>
                    This page will give you the full details of the todo with id: {todo.id}
                </h2>
            </div>
            <div className={classes.container}>
                <p className={classes.title}>{todo.title}</p>
                <p>{todo.description}</p>
                <button 
                className={todo.completed ? classes.completedButton : classes.button}
                onClick={()=> markAsDone(router, todo.id)}
                >{todo.completed ? "Done" : "Mark as Done"}</button>
            </div>
        </>
    )
}

export default TodoDetailsPage

export const getStaticProps = async (context) => {
    const todoId = context.params.todoId

    const dbPassword = "wBrYwEU2hUHJXBZo"

    const client = await MongoClient.connect(
        "mongodb+srv://ThulioUpskill:"+dbPassword+"@cluster0.piaazo3.mongodb.net/todos?retryWrites=true&w=majority")

    const db = client.db();

    const todosCollection = db.collection("todos")

    const selectedTodo = await todosCollection.findOne({_id: ObjectId(todoId)});

    client.close();

    return {
        props: {
            todo: {
                id: selectedTodo._id.toString(),
                title: selectedTodo.title,
                description: selectedTodo.description,
                completed: selectedTodo.completed
            }
        },
        revalidate: 1
    }

}

export const getStaticPaths = async () => {
    const dbPassword = "wBrYwEU2hUHJXBZo"

  const client = await MongoClient.connect(
    "mongodb+srv://ThulioUpskill:"+dbPassword+"@cluster0.piaazo3.mongodb.net/todos?retryWrites=true&w=majority")

  const db = client.db();

  const todosCollection = db.collection("todos")

  const todos = await todosCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    //404 page
    fallback: "blocking",
    paths: todos.map((todo) => ({
        params: {
            todoId: todo._id.toString()
        }
    }))
  }
}