import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Basket3, Book, CalendarWeek, DoorOpen, House, Rulers, ThermometerHalf } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { API_URL } from "./ApiUtils";

function Menubar() {

    const { t, i18n } = useTranslation();

	const [language, setLanguage] = useState(i18n.language);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => axios.get(API_URL + "/loggedIn").then(res => setLoggedIn(res.data)), []);

	const changeLanguage = language => {
		setLanguage(language);
		i18n.changeLanguage(language);
	};

    const logout = () => {
        axios.post(API_URL + "/logout").then(() => window.location.reload());
    };

    return (
        <Navbar collapseOnSelect expand="xxl" fixed="top">
            <Navbar.Brand href="/">{t("application.name")}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link href="/"><CalendarWeek /> {t("dishList.headline")}</Nav.Link>
                <Nav.Link href="/dishes"><Book /> {t("dish.headline")}</Nav.Link>
                <Nav.Link href="/ingredients"><Basket3 /> {t("ingredient.headline")}</Nav.Link>
                <Nav.Link href="/measurements"><Rulers /> {t("measurement.headline")}</Nav.Link>
                <Nav.Link href="/seasons"><ThermometerHalf /> {t("season.headline")}</Nav.Link>
                <Nav.Link href="/household"><House /> {t("household.headline")}</Nav.Link>
				<ToggleButtonGroup value={language} exclusive onChange={e => changeLanguage(e.target.value)}>
					<ToggleButton value="de" className="toggle-button">DE</ToggleButton>
					<ToggleButton value="en" className="toggle-button">EN</ToggleButton>
				</ToggleButtonGroup>
				{ loggedIn && <Nav.Link onClick={logout} className="logout-button"><DoorOpen /> {t("base.action.logout")}</Nav.Link> }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Menubar;