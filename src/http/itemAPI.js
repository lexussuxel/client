import {$authHost, $host} from "./index"


export const getItemInCollection = async (id) => {
    const {data} = await $host.get(`api/item/${id}/items`);
    return data;
}

export const CreateItem = async (item, id) => {

    const {data} = await $authHost.post(`api/item/${id}/create`, item);
    return data;
}