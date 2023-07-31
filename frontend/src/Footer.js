import { Col, Container, Row } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export const Footer = () => {

    const { t } = useTranslation()

    return (
        <Container className="footer d-flex justify-content-center text-muted">
            <Row className="w-100">
                <Col xs="6" className="d-flex justify-content-center">
                    <p><a target="_blank" rel="noreferrer" href="https://github.com/YusTheYokai/al-gorceries">{t("footer.issueOrFeedback")}</a></p>
                </Col>
                <Col xs="6" className="d-flex justify-content-center">
                    <p>Copyright (c) 2023 <a href="mailto:nico@lerchl.one">Nico Lerchl</a></p>
                </Col>
            </Row>
        </Container>
    )
}
