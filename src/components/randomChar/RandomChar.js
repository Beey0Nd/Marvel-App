import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect, useRef} from 'react';
import MarvelService from '../services/MarvelService';
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const tryButton = useRef(null);

    const toggleTry = (state) => {
        tryButton.current.disabled = state;
    }

    const marvelService = MarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        loading ? toggleTry(true) : toggleTry(false);
    }, [loading])

    const updateChar = () => {
        setError(false);
        onCharLoading().then(onCharLoaded).catch(onError)
    }

    const onCharLoading = async () => {
        setLoading(true);
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        return await marvelService.getCharacter(id)
    }

    const onCharLoaded = (char) => {
        setLoading(false);
        setRandomCharacter(char);
    }

    const onError = () => {
        setLoading(false)
        setError(true);
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
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
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