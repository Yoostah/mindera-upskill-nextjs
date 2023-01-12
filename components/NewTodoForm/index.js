import { useRef } from "react"

import classes from "./NewTodoForm.module.css"

const NewTodoForm = (props) => {
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        const filledTitle = titleInputRef.current.value;
        const filledDescription = descriptionInputRef.current.value;

        const todoData = {
            title: filledTitle,
            description: filledDescription
        }
         props.onAddTodo(todoData)
    }


    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor="title">Todo Title</label>
                    <input type="text" required id="title" ref={titleInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="description">Todo description</label>
                    <textarea type="text" required id="description" rows="5" ref={descriptionInputRef} />
                </div>
                <div className={classes.actions}>
                    <button>Add Todo</button>
                </div>
            </form>
        </div>
    )
}

export default NewTodoForm