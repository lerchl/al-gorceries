import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { getEntities } from "../../ApiUtils";

export const AddDishIngridient = ({dishIngridients, setDishIngridients}) => {

    const [measurements, setMeasurements] = useState([]);
    const [ingridients, setIngridients] = useState([]);

    useEffect(() => getEntities("measurements", setMeasurements), []);
    useEffect(() => getEntities("ingridients", setIngridients), []);

    const [factor, setFactor] = useState();
    const [measurement, setMeasurement] = useState();
    const [ingridient, setIngridient] = useState();

    const addDishIngridient = () => {
        setDishIngridients([...dishIngridients, { factor: factor, measurement: measurement, ingridient: ingridient }]);
    }

    return (
        <>
            <h5>Zutat hinzufügen</h5>
            <div className="row dialog-row">
                <TextField label="Faktor" value={factor} onChange={e => setFactor(e.target.value)} type="number" className="number-input" inputProps={{ inputMode: "numeric" }} />
            </div>
            <div className="row dialog-row">
                <TextField label="Maßeinheit" value={measurement} onChange={e => setMeasurement(e.target.value)} select>
                    {
                        measurements.map(m => {
                            return <MenuItem value={m._id}>{m.name}</MenuItem>
                        })
                    }
                </TextField>
            </div>
            <div className="row dialog-row">
                <TextField label="Zutat" value={ingridient} onChange={e => setIngridient(e.target.value)} select>
                    {
                        ingridients.map(i => {
                            return <MenuItem value={i._id}>{i.name}</MenuItem>
                        })
                    }
                </TextField>
            </div>
            <div className="row dialog-row">
                <Button onClick={addDishIngridient}><PlusLg color="white" size={30} /></Button>
            </div>
        </>
    );

}