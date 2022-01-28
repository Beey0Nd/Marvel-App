import './comicsList.scss';
import { memo, useEffect, useCallback, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
// import { Transition } from 'react-transition-group';
// import withList from '../HOCs/withList'; => отрефакторить CharList и ComicList

const ComicsList = () => {
    const [list, setList] = useState([]);
    let {current: offset} = useRef(50)
    const {getAllComics, loading} = useMarvelService();

    useEffect(() => {
        fetchList(false);
    },[])

    const fetchList = (more) => {
        getAllComics(offset).then(newList => onLoaded(newList, more))
    }
    const onLoaded = (newList, more) => {
        more ? setList(list => [...list, ...newList]) : setList(newList);
        offset = offset + 8;
    }

    const onMore = useCallback(() => {
        fetchList(true);
    }, [])

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                <List comicsList={list}/>
            </ul>
            {loading ? <Spinner/> : null}
            {!loading ? <button className="button button__main button__long">
                <div className="inner" onClick={onMore}>load more</div>
            </button> : null}
        </div>
    )
}

const List = memo(({comicsList}) => {
    const renderItems = () => {
        return comicsList.map(item => {
            const {id, thumbnail, title, price/*, url*/} = item; 

            return (
                <li key={id} onClick={handleClick} tabIndex="0" className="comics__item">
                    <Link tabIndex="-1" to={`/comics/${id}`}>
                        <img tabIndex="-1" src={thumbnail} alt={title} className="comics__item-img"/>
                        <div tabIndex="-1" className="comics__item-name">{title}</div>
                        <div tabIndex="-1" className="comics__item-price">{price}</div>
                    </Link>
                </li>    
            )
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        e.currentTarget.focus()
    }

    return (
        renderItems()
    )
})

// const ComicsList = withList(memo(BaseComicsList), "getAllComics", 100, 8)

export default ComicsList;