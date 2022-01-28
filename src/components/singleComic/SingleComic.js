import Helmet from 'react-helmet';

import './singleComic.scss';
import { Link, useParams } from 'react-router-dom';
import useMarvelService from '../services/MarvelService';
import { useEffect, useState } from 'react';

const SingleComic = () => {
    const [comic, setComic] = useState([]);
    const {comicId} = useParams();
    const {getComic} = useMarvelService();

    useEffect(() => {
        fetchComic();
    }, [comicId])

    const fetchComic = () => {
        getComic(comicId).then(comic => setComic(comic));
    }

    const renderComic = (comic) => {
        const {thumbnail, title, price, description, pages, language} = comic;

        return(
            <>
                <Helmet>
                    <meta
                        name="description"
                        content="Page with a single comic"
                    />
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pages} pages</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </>
        )
    }
    const renderedComic = renderComic(comic);
    
    return (
        <div className="single-comic"> 
            {renderedComic}
        </div>
    )
}

export default SingleComic;