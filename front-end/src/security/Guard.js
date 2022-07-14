import { createContext, useState } from "react";
import { LoginDialog } from "../routes/login/LoginDialog";

export const LoginDialogContext = createContext();

export const Guard = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"))
    const [show, setShow] = useState(!loggedIn);

    return (
        <>
            <LoginDialog show={show} close={() => setShow(false)} setLoggedIn={setLoggedIn} />
            {loggedIn ? children : <></>}
        </>
    );
};
