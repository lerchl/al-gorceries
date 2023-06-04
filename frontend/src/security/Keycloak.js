import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
    url: `${process.env.REACT_APP_KEYCLOAK_URL}:${process.env.REACT_APP_KEYCLOAK_PORT}/auth`,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID
});