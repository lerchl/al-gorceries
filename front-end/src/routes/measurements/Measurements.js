import Menubar from "../../Menubar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

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

    return (
        <>
            <Menubar />
            <div className="content">
                <h1>Maßeinheiten</h1>
                <Table className="custom-table">
                    <thead className="position-sticky">
                        <tr>
                            <th>Bezeichnung</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            measurements.map(measurement => {
                                return (
                                    <tr>
                                        <td>{measurement.name}</td>
                                        <td>Hier sind Buttons</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Measurements;