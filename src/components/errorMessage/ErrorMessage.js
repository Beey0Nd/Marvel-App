import error from "../../resources/img/error.gif";

function ErrorMessage({style={width: "100%"}}) {
    return (
        <>
            <img style={style} src={error} alt="Error" />
        </>
    )
}

export default ErrorMessage;