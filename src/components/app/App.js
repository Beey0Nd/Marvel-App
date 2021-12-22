import { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Characters from "../../pages/Characters";
import Comics from "../../pages/Comics";
import Page404 from "../page404/Page404";

const App = () => {
    const [charList, setCharList] = useState([]);
    const [currentChar, setCurrentChar] = useState(null);
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={
                            <Characters 
                            charList={charList} 
                            setCharList={setCharList}
                            currentChar={currentChar}
                            setCurrentChar={setCurrentChar}
                            />}
                        />
                        <Route path="/comics" element={<Comics/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;