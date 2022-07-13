import { TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

export const LoginDialog = ({show, close}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const onChange = (event, set) => {
        set(event.target.value);
    }

    const login = () => {
        const data = { email: email, password: password }
        axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/login`, data).then(res => {
            localStorage.setItem("token", res.data.token);
            close();
        }).catch(_err => {
            setPassword("");
            setShowError(true);
        });
    }

    return (
        <Modal show={show} backdrop="static" onHide={close} keyboard={false} style={{ width: "100%" }}>
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row dialog-row">
                        <TextField value={email} label="E-Mail" onChange={event => onChange(event, setEmail)} />
                    </div>
                    <div className="row dialog-row">
                        <TextField type="password" value={password} label="Password" onChange={event => onChange(event, setPassword)} />
                    </div>
                    <div className="row dialog-row">
                        { showError && <p className="error">E-Mail und/oder Passwort falsch!</p> }
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <a class="register-login-link" href="/registration">Noch nicht registriert?</a>
                <button type="button" onClick={login} className="custom-button primary">Einloggen</button>
            </Modal.Footer>
        </Modal>
    );
}
