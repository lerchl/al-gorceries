import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { DISH_GROUPS, getEntities } from "../../ApiUtils";
import { compareEntities } from "../../Entity";

export const DishListConfigWidget = ({}) => {

	const { t } = useTranslation();

	const [dishGroups, setDishGroups] = useState([]);

	const [generatedDishCount, setGeneratedDishCount] = useState(0);

	const [dishGroup, setDishGroup] = useState(null);
	const [dishGroupDishCount] = useState(1);

	useEffect(() => getEntities(DISH_GROUPS, setDishGroups), []);

	return (
		<div className="widget">
			<h2>{ t("household.dishListConfig.title") }</h2>
			<Container fluid className="overlay">
				<div className="row">
					<TextField value={generatedDishCount} onChange={ event => setGeneratedDishCount(event.target.value) } label={ t("household.dishListConfig.dishCount") } />
						<table className="custom-table">
							<thead className="position-sticky">
								<tr>
									<th>Group</th>
									<th>Count</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
				</div>
				
								<Autocomplete options={dishGroups}
											  getOptionLabel={d => d?.name}
											  value={dishGroup}
											  isOptionEqualToValue={compareEntities}
											  onChange={(_event, value) => setDishGroup(value) }
											  disablePortal
											  renderInput={params => <TextField {...params} label={t("dishGroup.name")} />}
											  openText={t("base.action.open")}
											  closeText={t("base.action.close")}
											  noOptionsText={t("measurement.noOptions")}
											  clearIcon={<></>} />
								<TextField value={generatedDishCount} onChange={ event => setGeneratedDishCount(event.target.value) } label={ t("household.dishListConfig.dishCount") } />
			</Container>
		</div>
	)
}
