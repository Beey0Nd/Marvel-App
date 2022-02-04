import Helmet from 'react-helmet';

import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../app/App';
import './SingleCharacter.scss';
import { useParams } from 'react-router-dom';
import useMarvelService from '../services/MarvelService';

const SingleCharacter = () => {
    const [fetchedChar, setFetchedChar] = useState(null);
    const {searchCharName} = useContext(AppContext);
    const {name} = useParams();
    const {getCharacterByName} = useMarvelService();

    useEffect(() => {
        if (!searchCharName) fetchChar(name)
    },[])

    const fetchChar = (char) => {
        getCharacterByName(char).then(char => setFetchedChar(char))
    }

    const renderChar = (char) => {
        if (!char) return null
        const {name, description, thumbnail} = char;

        return(
            <>
                <Helmet>
                    <meta
                        name="description"
                        content="Page with a single character"
                    />
                    <title>{name}</title>
                </Helmet>
                <img src={thumbnail} alt={name} className="single-character__img"/>
                <div className="single-character__info">
                    <h2 className="single-character__name">{name}</h2>
                    <p className="single-character__descr">{description}</p>
                </div>
            </>
        )
    }
    const renderedChar = renderChar(searchCharName ? searchCharName : fetchedChar);
    
    return (
        <div className="single-character"> 
            {renderedChar}
        </div>
    )
}

export default SingleCharacter;