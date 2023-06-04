import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { React, useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { updateEntityAndGetEntities } from "../../ApiUtils";
import { EditDialogContext } from "../../Entity";
import { TableContentContext } from "../../OverviewPage";
import { defaultOnChange } from "../../StateUtils";
import { EntityContext } from "../../TableContent";

export const EditSeasonDialog = () => {

    const { t } = useTranslation();

    const { entityApiEndpoint, setEntities } = useContext(TableContentContext);
    const entity = useContext(EntityContext);
    const { show, close } = useContext(EditDialogContext);

    const originalStart = dayjs().date(entity.beginDay).month(entity.beginMonth);
    const originalStop = dayjs().date(entity.endDay).month(entity.endMonth);

    const [name, setName] = useState(entity.name);
    const [start, setStart] = useState(originalStart);
    const [stop, setStop] = useState(originalStop);

    const closeDialog = () => {
        setName(entity.name);
        setStart(originalStart);
        setStop(originalStop);
        close();
    }

    const saveSeason = () => {
        const season = {
            "id": entity.id,
            "name": name,
            "beginDay": start.$D,
            "beginMonth": start.$M,
            "endDay": stop.$D,
            "endMonth": stop.$M
        }
        updateEntityAndGetEntities(entityApiEndpoint, season, setEntities);
        closeDialog();
    }

    return (
        <Modal show={show} backdrop="static" onHide={closeDialog} keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{t("season.dialog.edit.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row dialog-row">
                    <TextField value={name}
                               label={t("season.attribute.name")}
                               onChange={e => defaultOnChange(e, setName)} />
                </div>
                <div className="row dialog-row">
                    <DatePicker value={start}
                                label={t("season.attribute.begin")}
                                onChange={value => setStart(value)}
                                renderInput={params => <TextField {...params} />} />
                </div>
                <div className="row dialog-row">
                    <DatePicker value={stop}
                                label={t("season.attribute.end")}
                                onChange={value => setStop(value)}
                                renderInput={params => <TextField {...params} />} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" onClick={saveSeason} className="custom-button primary">{t("base.action.save")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </Modal.Footer>
        </Modal>
    );
}