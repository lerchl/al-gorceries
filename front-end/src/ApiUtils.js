import axios from "axios";

export const MEASUREMENTS = "unitsOfMeasurement";
export const INGREDIENTS = "ingredients";
export const DISHES = "dishes";
export const DISH_INGREDIENTS = "dishIngredients";
export const DISH_STEPS = "dishSteps";
export const DISH_LIST = "dishLists";
export const DISH_LIST_DISH = "dishListDishes";
export const SEASONS = "seasons";

export const API_URL = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`;

axios.defaults.withCredentials = true;

/**
 * Sends a request for fetching an entity via its id.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {Function} setEntity setter for the stateful value
 * @param {Number} id id of the entitiy to fetch
 */
export async function getEntity(entityApiEndpoint, setEntity, id) {
    const res = await axios.get(`${API_URL}/${entityApiEndpoint}/${id}`)
    setEntity(res.data);
}

/**
 * Sends a request for fetching entities.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {Function} setEntities setter for the stateful value
 */
export async function getEntities(entityApiEndpoint, setEntities) {
    const res = await axios.get(`${API_URL}/${entityApiEndpoint}`);
    setEntities(res.data);
}

/**
 * Sends a request for fetching entities with a parameter.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {Function} setEntities setter for the stateful value
 * @param {*} param the parameter
 */
export function getEntitiesWithParam(entityApiEndpoint, setEntities, param) {
    axios.get(`${API_URL}/${entityApiEndpoint}/${param}`).then(res => {
        handleAnswer(res, 200);
        setEntities(res.data);
    });
}

/**
 * Sends a request for creating an entity.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be created
 * @returns {Promise<AxiosResponse<any, any>>} promise with response
 */
export function createEntity(entityApiEndpoint, entity) {
    let url = `${API_URL}/${entityApiEndpoint}`;
    return axios.post(url, entity);
}

/**
 * Sends a request for creating an entity and then fetching all of them.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be created
 * @param {Function} setEntities setter for the stateful value
 */
export function createEntityAndGetEntities(entityApiEndpoint, entity, setEntities) {
    let url = `${API_URL}/${entityApiEndpoint}`;
    axios.post(url, entity).then(res => {
        handleAnswer(res, 201);
        getEntities(entityApiEndpoint, setEntities);
    });
}

/**
 * Sends a request for creating an entity and then fetching all of them with a parameter.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be created
 * @param {Function} setEntities setter for the stateful value
 * @param {*} param the parameter
 */
export function createEntityAndGetEntitiesWithParam(entityApiEndpoint, entity, setEntities, param) {
    let url = `${API_URL}/${entityApiEndpoint}`;
    axios.post(url, entity).then(res => {
        handleAnswer(res, 201);
        getEntitiesWithParam(entityApiEndpoint, setEntities, param);
    });
}

/**
 * Sends a request for updating an entity and then fetching it.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be updated
 * @param {Function} setEntity setter for the stateful value
 */
export function updateEntityAndGetEntity(entityApiEndpoint, entity, setEntity) {
    let url = `${API_URL}/${entityApiEndpoint}/${entity.id}`;
    axios.put(url, entity).then(res => {
        handleAnswer(res, 200);
        getEntity(entityApiEndpoint, setEntity, entity.id);
    })
}

/**
 * Sends a request for updating an entity and then fetching all of them.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be updated
 * @param {Function} setEntities setter for the stateful value
 */
export function updateEntityAndGetEntities(entityApiEndpoint, entity, setEntities) {
    let url = `${API_URL}/${entityApiEndpoint}/${entity.id}`;
    axios.put(url, entity).then(res => {
        handleAnswer(res, 200);
        getEntities(entityApiEndpoint, setEntities);
    });
}

/**
 * Sends a request for updating an entity and then fetching all of them with a parameter.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be updated
 * @param {Function} setEntities setter for the stateful value
 * @param {*} param the parameter
 */
export function updateEntityAndGetEntitiesWithParam(entityApiEndpoint, entity, setEntities, param) {
    let url = `${API_URL}/${entityApiEndpoint}/${entity.id}`;
    axios.put(url, entity).then(res => {
        handleAnswer(res, 200);
        getEntitiesWithParam(entityApiEndpoint, setEntities, param);
    });
}

/**
 * Sends a request for deleting an entity.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {Number} id id of the entity
 * @param {Function} setEntities setter for the stateful value
 */
export function deleteEntityAndGetEntities(entityApiEndpoint, id, setEntities) {
    let url = `${API_URL}/${entityApiEndpoint}/${id}`;
    axios.delete(url).then(res => {
        handleAnswer(res, 200);
        getEntities(entityApiEndpoint, setEntities);
    });
}

/**
 * Sends a request for deleting an entity.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {Number} id id of the entity
 * @param {Function} setEntities setter for the stateful value
 * @param {*} param the parameter
 */
 export function deleteEntityAndGetEntitiesWithParam(entityApiEndpoint, id, setEntities, param) {
    let url = `${API_URL}/${entityApiEndpoint}/${id}`;
    axios.delete(url).then(res => {
        handleAnswer(res, 200);
        getEntitiesWithParam(entityApiEndpoint, setEntities, param);
    });
}

/**
 * Handles api answer.
 * @param {*} res the answer
 * @param {Number} expectedCode the expected http code
 */
export function handleAnswer(res, expectedCode) {
    if (res.status !== expectedCode) {
        console.log(res);
    }
}
