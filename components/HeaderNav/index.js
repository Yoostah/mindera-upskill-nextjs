import Link from "next/link"
import classes from "./HeaderNav.module.css"

const HeaderNav = () => {
    return (
    <div className={classes.container}> 
        <Link className={classes.homeLink} href="/">NextJS Upskill Course</Link>
        <div className={classes.btbContainer}>
            <Link className={classes.link} href="/add-new">Created New Todo</Link>
            <Link className={classes.link} href="/completed">Completed Todos</Link>
        </div>
    </div>
    )

}

export default  HeaderNav