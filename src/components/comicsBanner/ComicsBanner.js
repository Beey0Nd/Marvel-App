import avengers from "../../resources/img/Avengers.png";
import avengersLogo from "../../resources/img/Avengers logo.png";
import "./comicsBanner.scss";

const ComicsBanner = () => {
    return(
        <>
            <article className="comics__banner">
                <img className="comics__avengers" src={avengers} alt="Avengers" />
                <div className="comics__info">
                    <h2 className="comics__prompt">New comics every week!</h2>
                    <h2 className="comics__prompt">Stay tuned!</h2>  
                </div>
                <img className="comics__avengers-logo" src={avengersLogo} alt="Avengers logo" />
            </article>
            
        </>
    )
}

export default ComicsBanner;