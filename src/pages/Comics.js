import Helmet from "react-helmet";

import ComicsBanner from "../components/comicsBanner/ComicsBanner";
import ComicsList from "../components/comicsList/ComicsList";

const Comics = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Comics"
                />
                <title>Comics</title>
            </Helmet>
            <ComicsBanner/>
            <ComicsList/>
        </>
    )
}

export default Comics;