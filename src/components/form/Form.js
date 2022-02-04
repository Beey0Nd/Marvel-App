import { useContext, useEffect} from "react";
import { Formik, Form as FormikForm, Field} from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AppContext } from "../app/App";

import useMarvelService from "../services/MarvelService";

import "./Form.scss";

const Form = () => {
    const {searchCharName, setSearchCharName} = useContext(AppContext);
    const { loading, clearError, getCharacterByName } = useMarvelService();

    useEffect(() => {
        return () => {
            setSearchCharName(undefined);
        }
    }, [])

    const updateChar = (name) => {
        clearError()
        getCharacterByName(name).then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setSearchCharName(char)
    }

    const charResult = searchCharName ? 
    <p className="form__response-success">Found! Go to {searchCharName.name} page?</p> 
    : searchCharName !== undefined ? <p className="form__response-error">Character was not found. Please, check the name and try again.</p> : null
    return (
        <Formik
            initialValues = {{
                charName: ""
            }}
            validationSchema = {Yup.object({
                charName: Yup.string().required("This field is required")
            })}
            onSubmit = {({charName}) => {
                updateChar(charName)
            }}
        >
            <FormikForm
            className="form">
                <label className="form__desc">Or find a character by name:</label>
                <div className="form__search-wrapper">
                    <Field 
                    name="charName"
                    className={`form__search`} 
                    type="text" 
                    placeholder="Enter a character's name"/>
                    <button 
                        className="form__button button button__main"
                        type="submit"
                        disabled={loading}
                    >
                        <div className="inner">Find</div>
                    </button>
                </div>
                <div className="form__response" >
                    {charResult}
                    {searchCharName ? 
                    <Link to={`/characters/${searchCharName.name}`} className="form__button button">
                        <div className="form__inner">To page</div>
                    </Link> : null}
                </div>
            </FormikForm>
        </Formik>
    )
}

export default Form;