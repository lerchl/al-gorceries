import { TextField } from "@mui/material";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntitiesWithParam, DISH_STEPS } from "../../../ApiUtils";

export const AddStepDialog = ({show, close, dishId, setSteps}) => {

    const { t } = useTranslation();
    const [content, setContent] = useState("");

    const closeDialog = () => {
        setContent("");
        close();
    }

    const addStep = () => {
        const step = {
            content: content,
            dish: dishId
        }
        createEntityAndGetEntitiesWithParam(DISH_STEPS, step, setSteps, dishId);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{t("dishStep.dialog.add.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row dialog-row">
                    <TextField label={t("step.attribute.content")} value={content} onChange={e => setContent(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={addStep} className="custom-button primary">{t("base.action.add")}</button>
                <button onClick={closeDialog} className="custom-button">{t("base.action.add")}</button>
            </Modal.Footer>
        </Modal>
    );
}