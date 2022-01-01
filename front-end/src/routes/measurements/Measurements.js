import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import Menubar from "../../Menubar";
import AddMeasurementDialog from "./AddMeasurementDialog";
import { MeasurementTableContent } from "./MeasurementTableContent";

async function getMeasurements(setMeasurements) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/measurements`;
    const res = await axios.get(url);
    setMeasurements(res.data);
}

function Measurements() {
    const [measurements, setMeasurements] = useState([]);
    useEffect(() => {
        getMeasurements(setMeasurements);
    }, []);

    const [showDialog, setShowDialog] = useState(false);
    const [toEdit, setToEdit] = useState();
    const handleClose = () => setShowDialog(false);
    const handleOpen = (measurement) => {
        setShowDialog(true);
        if (measurement) {
            setToEdit(measurement);
        }
    };


    return (
        <>
            <Menubar />
            <div className="content">
                <h1>Maßeinheiten</h1>
                <Table className="custom-table">
                    <thead className="position-sticky">
                        <tr>
                            <th>Bezeichnung</th>
                            <th>
                                <button onClick={() => handleOpen(undefined)}
                                        className="icon-button"
                                        title="Neue Maßeinheit erstellen">
                                    <PlusLg color="white" />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <MeasurementTableContent getMeasurements={getMeasurements} setMeasurements={setMeasurements} measurements={measurements} />
                    </tbody>
                </Table>
            </div>
            <AddMeasurementDialog showDialog={showDialog} handleClose={handleClose} toEdit={toEdit} getMeasurements={getMeasurements} setMeasurements={setMeasurements} />
        </>
    );
}

export default Measurements;