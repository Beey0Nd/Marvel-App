import error from "./error.gif";

function ErrorMessage() {
    return (
        <>
            <img style={{width: "100%"}} src={error} alt="Error" />
        </>
    )
}

export default ErrorMessage;