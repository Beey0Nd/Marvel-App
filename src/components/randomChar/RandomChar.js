import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect, useRef} from 'react';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const RandomChar = () => {
    const [randomCharacter, setRandomCharacter] = useState({
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
    });
    const {loading, error, getCharacter, clearError} = useMarvelService();
    const tryButton = useRef(null);

    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        loading ? toggleTry(true) : toggleTry(false);
    }, [loading])


    const toggleTry = (state) => {
        tryButton.current.disabled = state;
    }

    const updateChar = () => {
        clearError();
        onCharLoading().then(onCharLoaded)
    }

    const onCharLoading = async () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        return await getCharacter(id)
    }

    const onCharLoaded = (char) => {
        setRandomCharacter(char);
    }

    return (
        <>
            <div className="randomchar">
                <div className="randomchar__block">
                    {error ? <ErrorMessage/> : null}
                    {loading ? <Spinner/> : null}
                    {!error && !loading ? <View randomCharacter={randomCharacter}/> : null}
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Randomize a character!<br/>
                    </p>
                    <p className="randomchar__title">
                        Click to show one
                    </p>
                    <button ref={tryButton} className="button button__main"
                    onClick={updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        </>
    )
}

function View({randomCharacter}){
    const {name, description, thumbnail, homepage, wiki} = randomCharacter;

    const checkDesc = () => {
        if (description && description.length >= 200) {
            return `${description.substr(0, 200)}...`
        }
        return description;
    }
    
    const image = (thumbnail) => {
        return thumbnail && thumbnail.indexOf("image_not_available") > -1 ? 
            <img src={thumbnail} style={{objectFit:"contain"}} alt="Random character" className="randomchar__img"/>
            :
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
        
    }
    return (
        <>
            {image(thumbnail)}
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{checkDesc()}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RandomChar;