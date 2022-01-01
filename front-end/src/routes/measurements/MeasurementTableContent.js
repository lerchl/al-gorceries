import { Measurement } from "./Measurement";

export const MeasurementTableContent = ({getMeasurements, setMeasurements, measurements}) => {
    return (
        measurements.map(measurement => {
            return <Measurement getMeasurements={getMeasurements} setMeasurements={setMeasurements} measurement={measurement} key={measurement._id} />;
        })
    );
}