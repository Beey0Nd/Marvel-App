import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";

import decoration from '../resources/img/vision.png';

const Characters = ({charList, setCharList, currentChar, setCurrentChar}) => {
    return(
        <>
            <RandomChar/> 
            <div className="char__content">
                <ErrorBoundary>
                    <CharList 
                    charList={charList}
                    setCharList={setCharList}
                    setCurrentChar={setCurrentChar}
                    /> 
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charList={charList} currentChar={currentChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default Characters;