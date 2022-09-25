import axios from "axios";
import { authURL, clientID, clientSecret, baseURL, grantType } from "../config";

// Auth

const instanceAuth = axios.create({
    baseURL: authURL,
    params: {
        "client_id": clientID,
        "client_secret": clientSecret,
        "grant_type": grantType,
    }
});

async function postAuth(url) {
    try {
        const result = await instanceAuth.post(url);
        return result.data;
    } catch (error) {
        throw error.response.data;
    }
}

// API

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        "Client-Id": clientID,
    }
});

async function get(url, data) {
    try {
        const result = await instance.get(url, data);
        return result.data;
    } catch (error) {
        throw error.response.data;
    }
}

export {
    postAuth,
    get,
}