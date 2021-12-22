import { useState, useEffect} from 'react';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';



const CharList = ({setCurrentChar, charList, setCharList}) => {
    const [offset, setOffset] = useState(1500);

    const {loading, getAllCharacters} = useMarvelService();

    useEffect(() => {
        fetchCharList(false);
    }, [])

    useEffect(() => {
        if (charList.length > 0) document.querySelectorAll(".char__item")[charList.length - 9].focus()
    }, [charList])
    
    const fetchCharList = (more) => {
        onListLoading().then(chars => onListLoaded(chars, more))
    } 

    const onListLoading = async () => {
        return await getAllCharacters(offset);
    }

    const onListLoaded = (newChars, more) => {
        more ? setCharList(charList => [...charList, ...newChars]) 
        : setCharList(newChars) 
    
        setOffset(offset + 9)
    }

    const onMore = () => {
        fetchCharList(true);
    }

    const render = (charList) => {
        const content = charList.map((item) => {
            const {name, thumbnail} = item;
            return (
                <li tabIndex={0} className="char__item" key={item.id}
                onClick={() => setCurrentChar(name)}>
                    <img src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });
        return content;
    }
    const moreButton = offset >= 1559 ? 
    <button className="button button__main button__long-no-more">
        <div className="inner">No more characters left</div>
    </button> : 
    <button disabled={loading} className="button button__main button__long"
    onClick={onMore}>
        <div className="inner">load more</div>
    </button>;

    const items = render(charList);

    return (
        <div className="char__list">
            {moreButton}
            <ul className="char__grid">
                {items}
            </ul>
            {loading ? <Spinner/> : null}
            {moreButton}
        </div>
    )
}

export default CharList;