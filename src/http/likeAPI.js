import {$authHost, $host} from "./index"

export const like = async(collectionId, userId) => {
    const {data} = await $authHost.post(`api/like/${collectionId}/create`, {collectionId, userId})
    return data;
}

export const delLike = async(collectionId, userId) => {
    const {data} = await $authHost.delete(`api/like/${collectionId}/delete/${userId}`)
    return data;
}


export const getLikes = async (collectionId) => {
    const {data} = await $host.get(`api/like/${collectionId}`);
    console.log(data)
    return data;
}