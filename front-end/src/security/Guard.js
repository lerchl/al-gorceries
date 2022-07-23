import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../ApiUtils";
import { LoginDialog } from "../routes/login/LoginDialog";
import { CircularProgress } from "@mui/material";

export const LoginDialogContext = createContext();

export const Guard = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [show, setShow] = useState(false);

    async function isLoggedIn() {
        return axios.get(API_URL + "/loggedIn");
    }

    useEffect(() => isLoggedIn().then(res => {
        setLoading(false);
        setLoggedIn(res.data);
        setShow(!res.data);
    }), []);

    return (
        <>
            { loading ? <div className="loading-container"><CircularProgress /></div> : <></> }
            { loggedIn ? children : <></> }
            <LoginDialog show={show} close={() => setShow(false)} />
        </>
    );
};