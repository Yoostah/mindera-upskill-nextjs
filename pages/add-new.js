import Head from "next/head"
import { useRouter } from "next/router";
import NewTodoForm from "../components/NewTodoForm";
import classes from "../styles/AddNew.module.css"

const AddNewTodoPage = () => {
    const router = useRouter()
    
    const addTodoHandler = async (todoData) => {
        const res = await fetch("/api/add-new-todo", {
            method: "POST",
            body: JSON.stringify({...todoData, completed: false}),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        const data = await res.json()

        console.log(data);

        router.push("/")
    }
    return (
        <>
            <Head>
                <title>Add New Todo</title>
                <meta name="description" content="" />
            </Head>
            <div className={classes.container}>                
                <p className={classes.title}>
                    Page for creating a new Global Todo
                </p>
                <p className={classes.description}>
                    App Description
                </p>
                <NewTodoForm onAddTodo={addTodoHandler}/>
            </div>
        </>
    )
}

export default AddNewTodoPage