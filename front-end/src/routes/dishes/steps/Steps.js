import { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { DISH_STEPS, getEntitiesWithParam } from "../../../ApiUtils";
import { StepsContainer } from "./StepsContainer";

export const Steps = ({ dishId }) => {

    const [steps, setSteps] = useState([]);

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => getEntitiesWithParam(DISH_STEPS, setSteps, dishId), []);

    return (
        <>
            <div className="space-between">
                <h2>Schritte</h2>
                <button className="icon-button mb-2" title="Schritt hinzufügen" onClick={() => setShowDialog(true)}>
                    <PlusLg color="white" size={30} />
                </button>
            </div>
            <StepsContainer  />
        </>
    );
}