import { TextField } from "@mui/material";
import axios from "axios";
import { React, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Registration = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState("");

    const onChange = (event, set) => {
        set(event.target.value);
    }

    const register = () => {
        const data = {
            email: email,
            password: password,
            passwordRepeat: passwordRepeat
        }

        axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/registration`, data).then(_res => {
            navigate("/registration");
        }).catch(err => {
            console.error(err);
            setError(err.message);
        });
    }

    return (
        <div className="content">
            <h1>Registrierung</h1>
            <form>
                <Container fluid="lg">
                    <Row>
                        <TextField value={email} label="E-Mail" onChange={event => onChange(event, setEmail)} />
                    </Row>
                    <Row>
                        <TextField type="password" value={passwordRepeat} label="Password" onChange={event => onChange(event, setPasswordRepeat)} />
                    </Row>
                    <Row>
                        <TextField type="password" value={password} label="Password wiederholen" onChange={event => onChange(event, setPassword)} />
                    </Row>
                    <Row>
                        <p className="error">{error}</p>
                    </Row>
                    <Row>
                        <button type="button" onClick={register} className="custom-button primary">Registrieren</button>
                    </Row>
                </Container>
            </form>
        </div>
    );
}