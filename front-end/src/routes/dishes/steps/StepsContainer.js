import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Step } from "./Step";

export const StepsContainer = ({ dishId, steps, setSteps }) => {

    const { t } = useTranslation();

    const Content = () => {
        if (steps.length === 0) {
            return <p style={{ textAlign: "center" }}>{t("dish.step.empty")}</p>;
        }

        return (
            steps.map((step, i) => {
                return <Step key={step.id}
                        step={step}
                        setSteps={setSteps}
                        dishId={dishId}
                        last={i + 1 === steps.length} />;
            })
        );
    }

    return (
        <Container fluid="lg" className="overlay">
            <Content />
        </Container>
    );
}