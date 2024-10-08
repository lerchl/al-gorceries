import axios from "axios";
import { React, useEffect, useState } from "react";
import { API_URL } from "../ApiUtils";
import { FetchingIndicator } from "../FetchingIndicator";
import { LoginDialog } from "../routes/login/LoginDialog";

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
            { loading ? <FetchingIndicator /> : <></> }
            { loggedIn ? children : <></> }
            <LoginDialog show={show} close={() => setShow(false)} setLoggedIn={setLoggedIn} />
        </>
    );
};