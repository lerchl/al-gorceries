import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Menubar from "../../Menubar";
import MeasurementDialog from "./MeasurementDialog";
import { PlusLg, TrashFill } from "react-bootstrap-icons";

async function getMeasurements(setMeasurements) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/measurements`;
    const res = await axios.get(url);
    setMeasurements(res.data);
}

function deleteMeasurement(id, setMeasurements) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/measurements/${id}`;
    axios.delete(url).then(res => {
        handle200Answer(res);
        getMeasurements(setMeasurements);
    });
}

const handle200Answer = res => {
    if (res.status !== 200) {
        console.log(res);
    }
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
                                    <PlusLg color="white" />
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
                                        <td>
                                            <button onClick={() => deleteMeasurement(measurement._id, setMeasurements)} className="icon-button">
                                                <TrashFill color="white" />
                                            </button>
                                        </td>
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