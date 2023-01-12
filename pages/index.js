import Head from 'next/head'
import TodosList from '../components/TodosList'
import {MongoClient} from "mongodb"
import styles from '../styles/Home.module.css'

export default function Home({ todos }) {
  return (
    <>
      <Head>
        <title>Upskill Example App</title>
        <meta name="description" content="Mindera Upskill course for NextJs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        Homepage
        <TodosList todos={todos}/>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const dbPassword = "wBrYwEU2hUHJXBZo"

  const client = await MongoClient.connect(
    "mongodb+srv://ThulioUpskill:"+dbPassword+"@cluster0.piaazo3.mongodb.net/todos?retryWrites=true&w=majority")

  const db = client.db();

  const todosCollection = db.collection("todos")

  const todos = await todosCollection.find({completed:false}).toArray();

  client.close();

  return {
    props: {
      todos: todos.map(todo => {
        return {
          id: todo._id.toString(),
          title: todo.title,
          description: todo.description,
          completed: todo.completed
        }
      })
    }
  }
}
