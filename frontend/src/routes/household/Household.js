import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DoorOpen } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { API_URL, HOUSEHOLDS, USERS } from "../../ApiUtils";
import { CustomSpinner } from "../../CustomSpinner";
import { CreateHouseholdWidget } from "./CreateHouseholdWidget";
import { HouseholdMembersWidget } from "./HouseholdMembersWidget";
import { JoinHouseholdWidget } from "./JoinHouseholdWidget";
import { OpenJoinRequestsWidget } from "./OpenJoinRequestsWidget";

export const Household = () => {

    const [loading, setLoading] = useState(true);
    const [household, setHousehold] = useState(null);

    const fetchHousehold = async () => {
        setLoading(true);

        try {
            const res = await axios.get(`${API_URL}/${HOUSEHOLDS}/current`);
            setHousehold(res.data);
        } catch (e) {
            // noop
        }

        setLoading(false);
    }

    useEffect(() => fetchHousehold(), []);

    const content = () => {
        if (!loading) {
            if (household) {
                return <WithHousehold household={household} setHousehold={setHousehold} />;
            } else {
                return <WithoutHousehold fetchHousehold={fetchHousehold} />;
            }
        }

        return <CustomSpinner />;
    }

    return (
        <div className="content">
            { content() }
        </div>
    );
}

const WithHousehold = ({ household, setHousehold }) => {

    const { t } = useTranslation();

    const leaveHousehold = async () => {
        await axios.post(`${API_URL}/${USERS}/household/current/leave`);
        setHousehold(null);
    }

    return (
        <>
            <h1>{t("household.headline")}: { household.name }</h1>
            <Container fluid>
                <Row>
                    <Col lg="6">
                        <HouseholdMembersWidget members={household.users} />
                    </Col>
                    <Col lg="6">
                        <OpenJoinRequestsWidget />
                    </Col>
                </Row>
            </Container>
            <button type="button" onClick={leaveHousehold} className="custom-button danger-button w-100"><DoorOpen /> { t("household.leave") }</button>
        </>
    );
}

const WithoutHousehold = ({ fetchHousehold }) => {

    return (
        <Container fluid>
            <Row>
                <Col lg="6">
                    <CreateHouseholdWidget fetchHousehold={fetchHousehold} />
                </Col>
                <Col lg="6">
                    <JoinHouseholdWidget />
                </Col>
            </Row>
        </Container>
    );
}
