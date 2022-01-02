import { useContext, useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { TableContentContext } from "../../OverviewPage";
import { EntityContext } from "../../TableContent";

// function deleteMeasurement(getMeasurements, setMeasurements, id) {
//     let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/measurements/${id}`;
//     axios.delete(url).then(res => {
//         handle200Answer(res);
//         getMeasurements(setMeasurements);
//     });
// }

// function handle200Answer(res) {
//     if (res.status !== 200) {
//         console.log(res);
//     }
// }

export const Ingridient = () => {
    const {getEntities, setEntities} = useContext(TableContentContext);
    const entity = useContext(EntityContext);

    const [showEditDialog, setShowEditDialog] = useState(false);

    const openEditDialog = () => {
        setShowEditDialog(true);
    }

    const closeEditDialog = () => {
        setShowEditDialog(false);
    }

    return (
        <>
            <tr key={entity._id}>
                <td>{entity.name}</td>
                <td>
                    <button onClick={openEditDialog} className="icon-button">
                        <PencilFill color="white" />
                    </button>
                    <button className="icon-button">
                        <TrashFill color="white" />
                    </button>
                </td>
            </tr>
        </>
    );
}
//<EditMeasurementDialog show={showEditDialog} closeDialog={closeEditDialog} getMeasurements={getMeasurements} setMeasurements={setMeasurements} measurement={measurement} />
