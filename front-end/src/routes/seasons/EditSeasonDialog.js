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

    const originalBegin = dayjs().date(entity.beginDay).month(entity.beginMonth);
    const originalEnd = dayjs().date(entity.endDay).month(entity.endMonth);

    const [name, setName] = useState(entity.name);
    const [begin, setBegin] = useState(originalBegin);
    const [end, setEnd] = useState(originalEnd);

    const closeDialog = () => {
        setName(entity.name);
        setBegin(originalBegin);
        setEnd(originalEnd);
        close();
    }

    const saveSeason = () => {
        const season = {
            "_id": entity._id,
            "name": name,
            "beginDay": begin.$D,
            "beginMonth": begin.$M,
            "endDay": end.$D,
            "endMonth": end.$M
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
                <button type="button" onClick={saveSeason} className="custom-button primary">{t("base.action.save")}</button>
                <button type="button" onClick={closeDialog} className="custom-button">{t("base.action.close")}</button>
            </Modal.Footer>
        </Modal>
    );
}