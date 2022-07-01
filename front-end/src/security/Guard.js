import { createContext, useState } from "react";
import { LoginDialog } from "../routes/login/LoginDialog";

export const LoginDialogContext = createContext();

export const Guard = ({ children }) => {

    // TODO: useEffect mit Abfrage, ob der User eingeloggt ist und abhängig davon den Dialog anzeigen oder nicht

    const [show, setShow] = useState(true);

    const close = () => {
        setShow(false);
    }

    return (
        <>
            <LoginDialog show={show} close={close} />
            {children}
        </>
    );
};

const NotLoggedIn = ({ keycloak }) => {

    return (
        <div className="content">
            <h1>Sie sind nicht eingeloggt.</h1>
            <div className="center">
                <button onClick={() => keycloak.login()} className="custom-button primary">Login</button>
            </div>
        </div>
    );
}
