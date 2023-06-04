import { TextField } from "@mui/material";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DISH_STEPS, updateEntityAndGetEntitiesWithParam } from "../../../ApiUtils";

export const EditStepDialog = ({ show, close, dishId, setSteps, step }) => {

    const { t } = useTranslation();

    const [content, setContent] = useState(step.content);

    const closeDialog = () => {
        setContent("");
        close();
    }

    const saveStep = () => {
        step.content = content;
        updateEntityAndGetEntitiesWithParam(DISH_STEPS, step, setSteps, dishId);
        close();
    }

    return (
        <Modal show={show} backdrop="static" onHide={close} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{t("dish.step.dialog.edit.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row dialog-row">
                    <TextField label={t("dish.step.attribute.content")} value={content} onChange={e => setContent(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={saveStep} className="custom-button primary">{t("base.action.add")}</button>
                <button onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </Modal.Footer>
        </Modal>
    );
}
