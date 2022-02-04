import Helmet from "react-helmet";

import { Link } from "react-router-dom";
import "./Page404.scss"

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Not Found page"
                />
                <title>Not Found</title>
            </Helmet>
            <div className="not-found__banner">
                <div className="not-found__no-page">Sorry, this page doesn't exist</div>
                <Link to="/" className="button button__main hop">
                    <div className="inner">Return to home page</div>
                </Link>
            </div>
         </>
    )
}

export default Page404;