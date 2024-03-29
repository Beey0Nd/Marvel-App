import { useState, Suspense, lazy, createContext } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Characters = lazy(() => import("../../pages/Characters"));
const SingleComic = lazy(() => import("../singleComic/SingleComic"));
const Comics = lazy(() => import("../../pages/Comics"));
const Page404 = lazy(() => import("../page404/Page404"));
const SingleCharacter = lazy(() => import("../singleCharacter/SingleCharacter"))

const AppContext = createContext(), {Provider} = AppContext;

const App = () => {
    const [charList, setCharList] = useState([]);
    const [currentChar, setCurrentChar] = useState(null);
    const [searchCharName, setSearchCharName] = useState(undefined);
    const [comicsList, setComicsList] = useState([]);
    
    return (
        <Provider value={{
            charList, setCharList, 
            currentChar, setCurrentChar, 
            comicsList, setComicsList, 
            searchCharName, setSearchCharName}}>
            <Router basename={process.env.PUBLIC_URL}>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path="/" element={
                                    <Characters />}
                                />
                                <Route path="/characters/:name" element={
                                    <SingleCharacter />}
                                />
                                <Route path="/comics" element={<Comics/>}/>
                                <Route path="/comics/:comicId" element={
                                    <SingleComic/>
                                }/>
                                <Route path="*" element={
                                    <Page404/>
                                }/>
                            </Routes>  
                        </Suspense>
                    </main>
                </div>
            </Router>
        </Provider>
    )
}

export {App, AppContext};