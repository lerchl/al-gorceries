import { useTranslation } from "react-i18next"
import { Entity } from "../../Entity";
import { OverviewPage } from "../../OverviewPage";
import { DISHES, DISH_GROUPS, getEntities } from "../../ApiUtils"
import { DishGroupDialog } from "./DishGroupDialog";
import { useEffect, useState } from "react";
import { EditDishGroupDialog } from "./EditDishGroupDialog";

export const DishGroups = () => {

	const { t  } = useTranslation();

	const getColumns = dishGroup => [dishGroup.name, dishGroup.dishes.map(d => d.name).join(", ")];

	const [dishOptions, setDishOptions] = useState([]);

	useEffect(() => getEntities(DISHES, setDishOptions), []);
		
	return <OverviewPage headline={ t("dishGroup.headline") }
		entityApiEndpoint={DISH_GROUPS}
		columns={ ["name", "dishes"] }
		entitiyComponent={ <Entity getColumns={getColumns} hasDetailPage={false} /> }
		addDialog={ <DishGroupDialog dishOptions={dishOptions} /> }
		openAddDialogButtonHover={ t("dishGroup.dialog.add.buttonHover") }
		editDialog={ <EditDishGroupDialog dishOptions={dishOptions} /> }
	/>
}
