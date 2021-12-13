import { useState, useEffect, useRef} from 'react';
import MarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';



const CharList = ({setCurrentChar, charList, setCharList}) => {
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(1500);

    const marvelService = MarvelService();

    useEffect(() => {
        updateList(false);
    }, [])
    
    const updateList = (more) => {
        onListLoading().then((chars) => onListLoaded(chars, more))
    } 

    const onListLoading = async () => {
        setLoading(true);
        return await marvelService.getAllCharacters(offset);
    }

    const onListLoaded = (newChars, more) => {
        setLoading(false);
        if (more) {
            setCharList([...newChars, ...charList])
        } else {
            setCharList(newChars) 
        }
        setOffset(offset + 9)
    }
    const onMore = () => {
        updateList(true);
    }

    const render = (charList) => {
        const content = charList.map(item => {
            const {name, thumbnail} = item;
            return (
                <li className="char__item" key={item.id}
                onClick={() => setCurrentChar(name)}>
                    <img src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });
    
        return content;
    }

    const load = loading ? <Spinner/> : null
    const cont = render(charList);
    const moreButton = offset >= 1559 ? 
    <button className="button button__main button__long-no-more">
        <div className="inner">No more characters left</div>
    </button> : 
    <button disabled={loading} className="button button__main button__long"
    onClick={onMore}>
        <div className="inner">load more</div>
    </button>;

    return (
        <div className="char__list">
            {moreButton}
            <ul className="char__grid">
                {cont}
            </ul>
            {load}
            {moreButton}
        </div>
    )
}

export default CharList;