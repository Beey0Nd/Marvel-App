import Helmet from "react-helmet";

import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import Form from "../components/form/Form";

import decoration from '../resources/img/vision.png';

const Characters = () => {
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <RandomChar/> 
            <div className="char__content">
                <ErrorBoundary>
                    <CharList/> 
                </ErrorBoundary>
                <ErrorBoundary>
                    <div className="char__wrapper">
                        <CharInfo/>
                        <Form/>  
                    </div>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default Characters;