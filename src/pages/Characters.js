import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

import decoration from '../resources/img/vision.png';

const Characters = () => {
    return(
        <>
            <RandomChar/> 
            <div className="char__content">
                <ErrorBoundary>
                    <CharList/> 
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default Characters;