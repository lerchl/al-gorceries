import { TextField } from "@mui/material";
import axios from "axios";
import { React, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../ApiUtils";

export const Registration = () => {

    const navigate = useNavigate();

    const { t } = useTranslation();

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

        axios.post(`${API_URL}/register`, data).then(_res => navigate("/")).catch(err => {
            console.error(err);
            setError(err.message);
        });
    }

    return (
        <div className="content">
            <Container className="widget">
                <h1>Registrierung</h1>
                <form className="overlay">
                    <Row className="mb-2">
                        <TextField value={email} label={t("registration.attribute.email")} onChange={event => onChange(event, setEmail)} />
                    </Row>
                    <Row className="mb-2">
                        <TextField type="password" value={passwordRepeat} label={t("registration.attribute.password")} onChange={event => onChange(event, setPasswordRepeat)} />
                    </Row>
                    <Row className="mb-2">
                        <TextField type="password" value={password} label={t("registration.attribute.passwordRepeat")} onChange={event => onChange(event, setPassword)} />
                    </Row>
                    <Row className="mb-2">
                        <p className="error">{error}</p>
                    </Row>
                    <Row>
                        <button type="button" onClick={register} className="custom-button primary">{ t("base.action.register") }</button>
                    </Row>
                </form>
            </Container>
        </div>
    );
}
