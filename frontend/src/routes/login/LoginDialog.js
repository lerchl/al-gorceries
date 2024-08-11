import { TextField } from '@mui/material';
import axios from 'axios';
import { React, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const LoginDialog = ({show, close, setLoggedIn}) => {
	
	const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const onChange = (event, set) => {
        set(event.target.value);
    }

    const login = () => {
        const data = { email: email, password: password }
        axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/login`, data).then(_res => {
            setLoggedIn(true);
            close();
        }).catch(_err => {
            setPassword("");
            setShowError(true);
        });
    }

    return (
        <Modal show={show} backdrop="static" onHide={close} keyboard={false} style={{ width: "100%" }}>
            <Modal.Header>
                <Modal.Title>{ t("login.title") }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row dialog-row">
                        <TextField value={email} label={ t("index.attribute.email") } onChange={event => onChange(event, setEmail)} />
                    </div>
                    <div className="row dialog-row">
                        <TextField type="password" value={password} label={ t("index.attribute.password") } onChange={event => onChange(event, setPassword)} />
                    </div>
                    <div className="row dialog-row">
                        { showError && <p className="error">{ t("login.wrongLogin") }</p> }
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <a className="register-login-link" href="/registration">{ t("login.notYetRegistered") }</a>
                <button type="button" onClick={login} className="custom-button primary">{ t("login.login") }</button>
            </Modal.Footer>
        </Modal>
    );
}
