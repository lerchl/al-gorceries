import axios from "axios";

export const MEASUREMENTS = "measurements";
export const INGRIDIENTS = "ingridients";
export const DISHES = "dishes";
export const DISH_INGRIDIENTS = "dishIngridients";
export const DISH_LIST = "dishList";

export const API_URL = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/`;

/**
 * Sends a request for fetching an entity via its id.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {Function} setEntity setter for the stateful value
 * @param {Number} id id of the entitiy to fetch
 */
export async function getEntity(entityApiEndpoint, setEntity, id) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}/${id}`)
    setEntity(res.data);
}

/**
 * Sends a request for fetching entities.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {Function} setEntities setter for the stateful value
 */
export async function getEntities(entityApiEndpoint, setEntities) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`);
    setEntities(res.data);
}

/**
 * Sends a request for fetching entities with a parameter.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {Function} setEntities setter for the stateful value
 * @param {*} param the parameter
 */
export async function getEntitiesWithParam(entityApiEndpoint, setEntities, param) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}/${param}`);
    setEntities(res.data);
}

/**
 * Sends a request for creating an entity.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be created
 * @returns {Promise<AxiosResponse<any, any>>} promise with response
 */
export function createEntity(entityApiEndpoint, entity) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`;
    return axios.post(url, entity);
}

/**
 * Sends a request for creating an entity and then fetching all of them.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be created
 * @param {Function} setEntities setter for the stateful value
 */
export function createEntityAndGetEntities(entityApiEndpoint, entity, setEntities) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`;
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
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`;
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
    let url = `${API_URL}${entityApiEndpoint}/${entity._id}`;
    axios.put(url, entity).then(res => {
        handleAnswer(res, 200);
        getEntity(entityApiEndpoint, setEntity, entity._id);
    })
}

/**
 * Sends a request for updating an entity and then fetching all of them.
 * @param {string} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be updated
 * @param {Function} setEntities setter for the stateful value
 */
export function updateEntityAndGetEntities(entityApiEndpoint, entity, setEntities) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}/${entity._id}`;
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
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}/${entity._id}`;
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
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}/${id}`;
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
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}/${id}`;
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