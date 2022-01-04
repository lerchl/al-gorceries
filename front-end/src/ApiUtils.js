import axios from "axios";

/**
 * Sends a request for fetching entities.
 * @param {*} entityApiEndpoint api endpoint of the entity
 * @param {*} setEntities setter for the stateful value
 */
export async function getEntities(entityApiEndpoint, setEntities) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`);
    setEntities(res.data);
}

/**
 * Sends a request for creating an entity.
 * @param {*} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be created
 * @param {*} setEntities setter for the stateful value
 */
export function createEntity(entityApiEndpoint, entity, setEntities) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}`;
    axios.post(url, entity).then(res => {
        handleAnswer(res, 201);
        getEntities(entityApiEndpoint, setEntities);
    });
}

/**
 * Sends a request for updating an entity.
 * @param {*} entityApiEndpoint api endpoint of the entity
 * @param {*} entity the entity to be updated
 * @param {*} setEntities setter for the stateful value
 */
export function updateEntity(entityApiEndpoint, entity, setEntities) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}/${entity._id}`;
    axios.put(url, entity).then(res => {
        handleAnswer(res, 200);
        getEntities(entityApiEndpoint, setEntities);
    });
}

/**
 * Sends a request for deleting an entity.
 * @param {*} entityApiEndpoint api endpoint of the entity
 * @param {*} id id of the entity
 * @param {*} setEntities setter for the stateful value
 */
export function deleteEntity(entityApiEndpoint, id, setEntities) {
    let url = `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/${entityApiEndpoint}/${id}`;
    axios.delete(url).then(res => {
        handleAnswer(res, 200);
        getEntities(entityApiEndpoint, setEntities);
    });
}

/**
 * Handles api answer.
 * @param {*} res the answer
 * @param {*} expectedCode the expected http code
 */
function handleAnswer(res, expectedCode) {
    if (res.status !== expectedCode) {
        console.log(res);
    }
}