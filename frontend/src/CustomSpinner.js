import { Spinner } from "react-bootstrap";

export const CustomSpinner = ({ page = false }) => {

    const wrapperClass = page ? "spinner-page" : "";

    return (
        <div hidden={!page} className={wrapperClass}>
            <Spinner />
        </div>
    );
}