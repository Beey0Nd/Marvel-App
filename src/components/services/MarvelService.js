function MarvelService() {
    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=794f72789e4da961747307dfea703504";
    let _baseOffset = 210;
    
    const _getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    }

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

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await _getResource(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await _getResource(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    

    return {getAllCharacters, getCharacter};
}

export default MarvelService;