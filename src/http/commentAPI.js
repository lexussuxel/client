import {$authHost, $host} from "./index"

export const comment = async(userId, itemId, text) => {
    const {data} = await $authHost.post(`api/comment/create`, {userId, itemId, text})
    return data;
}

export const delComments = async(id) => {
    const {data} = await $authHost.delete(`api/comment/${id}`)
    return data;
}


export const getComments = async (itemId) => {
    const {data} = await $host.get(`api/comment/${itemId}`);
    return data;
}

