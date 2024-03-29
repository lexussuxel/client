import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {useContext} from "react";
import {Context} from "../index";

export const create = async (user, name, description, privatee, addComments) => {
    const {data} = await $authHost.post('api/collection',
        {name, description,privatee, addComments, author:user.user.name, userId:user.user.id});
    return data;
}


export const getUserCollections = async (userId) => {
    const {data} = await $host.get(`api/collection/user/${userId}`);
    return data;
}


export const getBiggest = async () => {
    const {data} = await $host.get(`api/collection/biggest/big`);
    console.log(data)
    return data;
}


export const getAllCollections = async () => {
    const {data} = await $host.get(`api/collection/all`);
    return data;
}

export const updateCol = async (name, description, addComments, privatee, id) => {
    const {data} = await $authHost.post(`api/collection/${id}`, {name, description, addComments, privatee});
    return data;
}

export const findCollectionById = async (id) => {
    const {data} = await $host.get(`api/collection/${id}`);
    return data;
}

export const deleteCollection = async (id) => {
        await $authHost.delete(`/api/collection/${id}`);
        //console.log(data);
        //return data;
}