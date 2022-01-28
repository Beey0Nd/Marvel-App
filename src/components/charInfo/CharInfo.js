import './charInfo.scss';
import Skeleton from "../skeleton/Skeleton";

import { AppContext } from '../app/App';
import { useContext, useEffect } from 'react';

const CharInfo = () => {
    const {charList, currentChar, setCurrentChar} = useContext(AppContext);

    useEffect(() => {
        return () => {
            setCurrentChar(null);
        }
    }, [])

    const renderList = () => {
        const {
            name, 
            description, 
            thumbnail, 
            homepage, 
            wiki, 
            comics
        } = charList.find(item => item.name === currentChar)

        const generateComics = (comics) => {
            if (comics.length === 0) return "No data on this character";

            let comicList = [];
            for(let i = 0; i < comics.length; i++) {
                if (i > 9) break;
                
                comicList[i] = 
                <li key={i} className="char__comics-item">
                    <a href={comics[i].resourceURI}>{comics[i].name}</a>
                </li>
            }
            return comicList;  
        }
        return (
            <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">{description}</div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                   {generateComics(comics)}
                </ul> 
            </>
        )
    
    }

    const content = currentChar ? renderList() : <Skeleton/>
    return (
        <div className="char__info">
           {content}
        </div>
    )
}

export default CharInfo;