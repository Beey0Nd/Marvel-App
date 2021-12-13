import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const App = () => {
    const [charList, setCharList] = useState([]);
    const [currentChar, setCurrentChar] = useState(null);
    return (
        <div className="app">
            <AppHeader/>
            <main>
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
            </main>
        </div>
    )
}

export default App;