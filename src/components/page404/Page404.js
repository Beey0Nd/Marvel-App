import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import "./Page404.scss"

const Page404 = () => {
    return (
        <>
            <div style={{boxShadow: "0 0 15px 0 black", justifyContent: "space-around"}} className="comics__banner">
                <div className="page404__no-page">Sorry, this page doesn't exist</div>
                <Link to="/" className="button button__main hop">
                    <div className="inner">Return to home page</div>
                </Link>   
                <ErrorMessage style={{boxShadow: "0 0 15px 0 black",display: "block", height: "500px", margin: "0 auto"}}/>
            </div>
         </>
    )
}

export default Page404;