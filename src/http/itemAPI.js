import {$authHost, $host} from "./index"


export const getItemInCollection = async (id) => {
    const {data} = await $host.get(`api/item/${id}/items`);
    return data;
}

export const CreateItem = async (collectionId) => {
    const {data} = await $authHost.post(`api/item/${collectionId}/create`);
    return data;
}