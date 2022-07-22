import { createContext, useEffect, useState } from "react";
import { LoginDialog } from "../routes/login/LoginDialog";

export const LoginDialogContext = createContext();

export const Guard = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState()
    const [show, setShow] = useState(!loggedIn);

    useEffect(() => , []);

    return (
        <>
            <LoginDialog show={show} close={() => setShow(false)} setLoggedIn={setLoggedIn} />
            {loggedIn ? children : <></>}
        </>
    );
};
