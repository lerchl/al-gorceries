import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { React, useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { createEntityAndGetEntities } from "../../ApiUtils";
import { defaultOnChange } from "../../StateUtils";
import { AddEntityDialogContext } from "../../TableHead"

export const AddSeasonDialog = () => {
    const { show, close, setEntities, entityApiEndpoint } = useContext(AddEntityDialogContext);

    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [begin, setBegin] = useState(null);
    const [end, setEnd] = useState(null);

    const closeDialog = () => {
        setName("");
        setBegin(null);
        setEnd(null);
        close();
    }

    const saveSeason = () => {
        const season = {
            "name": name,
            "beginDay": begin.$D,
            "beginMonth": begin.$M,
            "endDay": end.$D,
            "endMonth": end.$M
        }
        createEntityAndGetEntities(entityApiEndpoint, season, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{t("season.dialog.add.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row dialog-row">
                    <TextField value={name}
                               label={t("season.attribute.name")}
                               onChange={e => defaultOnChange(e, setName)} />
                </div>
                <div className="row dialog-row">
                    <DatePicker value={begin}
                                label={t("season.attribute.begin")}
                                onChange={value => setBegin(value)}
                                renderInput={params => <TextField {...params} />} />
                </div>
                <div className="row dialog-row">
                    <DatePicker value={end}
                                label={t("season.attribute.end")}
                                onChange={value => setEnd(value)}
                                renderInput={params => <TextField {...params} />} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={saveSeason} className="custom-button primary">{t("base.action.add")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </Modal.Footer>
        </Modal>
    );
}