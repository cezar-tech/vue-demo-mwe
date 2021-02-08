/**
 * Acessa o backend instanciado localmente com o comando "npm start" na pasta backend
 */

import axios from "axios";

const backendDomain = "http://localhost:3001/";

const getPosts = async () => {
    const resp = await axios.get(`${backendDomain}posts`);
    return resp.data;
}

const getComments = async () => {
    const resp = await axios.get(`${backendDomain}comments`);
    return resp.data;
}

const getLikes = async () => {
    const resp = await axios.get(`${backendDomain}likes`);
    return resp.data;
}

const getBestFriends = async () => {
    const resp = await axios.get(`${backendDomain}bestFriends`);
    return resp.data;
}

export {
    getPosts, getComments, getLikes, getBestFriends
}

