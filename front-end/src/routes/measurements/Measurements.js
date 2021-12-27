import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import Menubar from "../../Menubar";
import MeasurementDialog from "./MeasurementDialog";

async function getMeasurements(setMeasurements) {
    console.log("Lade Maßeinheiten...");
    const res = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/measurements`);
    console.log(res.data);
    setMeasurements(res.data);
}

function Measurements() {
    const [measurements, setMeasurements] = useState([]);
    useEffect(() => {
        getMeasurements(setMeasurements);
    }, []);

    const [showDialog, setShowDialog] = useState(false);
    const handleClose = () => setShowDialog(false);
    const handleOpen = () => {
        setShowDialog(true);
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
                                <button onClick={handleOpen}
                                        className="icon-button"
                                        title="Neue Maßeinheit erstellen">
                                    <BsPlusLg />
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            measurements.map(measurement => {
                                return (
                                    <tr key={measurement._id}>
                                        <td>{measurement.name}</td>
                                        <td>Button</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <MeasurementDialog showDialog={showDialog} handleClose={handleClose} getMeasurements={getMeasurements} setMeasurements={setMeasurements} />
        </>
    );
}

export default Measurements;