import useHttp from "../hooks/http.hook";

function useMarvelService() {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=794f72789e4da961747307dfea703504";
    let _baseOffset = 210;

    const _transformCharacter = (char) => {
        const {id, name, description, thumbnail, urls} = char;
        let comics;
        try {
            comics = char.comics.items
        } catch (e) {
            comics = [];  
        }
        return {
            id: id ? id : null,
            name: name ? name : null,
            description: description ? description : "No Data on this character",
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            homepage: urls[0].url,
            wiki: urls[1].url,
            comics: comics
        }
    }

    const _transformComics = (comics) => {
        const {thumbnail, title, urls, prices} = comics;

        return {
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`, 
            title, 
            url: urls[0].url, 
            price: prices[0].price == 0 ? "NOT AVAILABLE" : prices[0].price
        }
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=794f72789e4da961747307dfea703504`);
        return res.data.results.map(_transformComics);
    }

    const getAllCharacters = async (offset = _baseOffset, limit = 9) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics};
}

export default useMarvelService;