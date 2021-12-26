import './comicsList.scss';
import useMarvelService from '../services/MarvelService';
import { memo, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(50);
    const {getAllComics} = useMarvelService();

    useEffect(() => {
        fetchComicsList(false);
    },[])

    const fetchComicsList = (more) => {
        getAllComics(offset).then(newComics => onComicsLoaded(newComics, more))
    }
    const onComicsLoaded = (newComics, more) => {
        more ? setComicsList(comicsList => [...comicsList, ...newComics]) : setComicsList(newComics);
        setOffset(offset => offset + 8)
    }

    const onMore = () => {
        fetchComicsList(true);
    }
    console.log("render")
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                <List comicsList={comicsList}/>
            </ul>
            <button className="button button__main button__long">
                <div className="inner" onClick={onMore}>load more</div>
            </button>
        </div>
    )
}

const List = memo(({comicsList}) => {
    const renderItems = () => {
        const res = comicsList.map(item => {
            const {id, thumbnail, title, price/*, url*/} = item; 

            return (
                <li key={id} onClick={handleClick} tabIndex="0" className="comics__item">
                    <Link tabIndex="-1" to={`/comics/${id}`}>
                        <img tabIndex="-1" src={thumbnail} alt={title} className="comics__item-img"/>
                        <div tabIndex="-1" className="comics__item-name">{title}</div>
                        <div tabIndex="-1" className="comics__item-price">{price === "NOT AVAILABLE" ? price : `${price }$`}</div>
                    </Link>
                </li>    
            )
        })
        return res;
    }

    const handleClick = (e) => {
        e.preventDefault();
        e.currentTarget.focus()
    }

    return (
        renderItems()
    )
})


export default ComicsList;