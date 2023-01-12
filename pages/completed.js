import Head from "next/head";
import TodosList from "../components/TodosList";
import {MongoClient} from "mongodb"

const CompletedPage = ({todos}) => {
    return (
        <>
            <Head>
                <title>Completed Todos</title>
                <meta name="description" content="" />
            </Head>
            <div>
                <TodosList todos={todos}/>
            </div>
        </>
    )
}

export default CompletedPage

export const getServerSideProps = async () => {
    const dbPassword = "wBrYwEU2hUHJXBZo"
  
    const client = await MongoClient.connect(
      "mongodb+srv://ThulioUpskill:"+dbPassword+"@cluster0.piaazo3.mongodb.net/todos?retryWrites=true&w=majority")
  
    const db = client.db();
  
    const todosCollection = db.collection("todos")
  
    const todos = await todosCollection.find({completed:true}).toArray();
  
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