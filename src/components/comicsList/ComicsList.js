import './comicsList.scss';
import useMarvelService from '../services/MarvelService';
import { useEffect, useState } from "react";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const {getAllComics} = useMarvelService();


    useEffect(() => {
        fetchComicsList(false);
    },[])

    const handleClick = (e) => {
        e.preventDefault();
        e.currentTarget.focus()
    }
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

    const renderItems = (comicsList) => {
        return comicsList.map(item => {
            const {thumbnail, title, price, url} = item; 
            return (
                <li onClick={handleClick} tabIndex="0" className="comics__item">
                    <a tabIndex="-1" href={url}>
                        <img tabIndex="-1" src={thumbnail} alt={title} className="comics__item-img"/>
                        <div tabIndex="-1" className="comics__item-name">{title}</div>
                        <div tabIndex="-1" className="comics__item-price">{price === "NOT AVAILABLE" ? price : `${price }$`}</div>
                    </a>
                </li>    
            )
        })
    }
    const items = renderItems(comicsList);
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {items}
            </ul>
            <button className="button button__main button__long">
                <div className="inner" onClick={onMore}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;