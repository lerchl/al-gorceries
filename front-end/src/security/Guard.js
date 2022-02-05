import { Backdrop, CircularProgress } from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";

export const Guard = ({ children }) => {

    const { initialized, keycloak } = useKeycloak();

    if (!initialized) {
        return (
            <Backdrop open={true} sx={{ color: "var(--primary)" }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return keycloak.authenticated ? children : <NotLoggedIn keycloak={keycloak} />;
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
