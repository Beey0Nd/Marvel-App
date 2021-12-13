import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";


// Ловит ошибки в RENDER, LCC и конструктораз
class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return (
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div>Something horrible happened. Refresh the page!</div>
                    <ErrorMessage/>
                </div>
            )

        }

        return (
            this.props.children
        )
    }
}

export default ErrorBoundary;