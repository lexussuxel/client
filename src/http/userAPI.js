import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (email, password, name) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: "USER", name});
    localStorage.setItem('token', data.token)

    return jwt_decode(data.token);
}

export const update = async (id, role, state) => {
    console.log(id, role, state)
    const {data} = await $host.post('api/user/update', {id, role, state});
}

export const login= async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}

export const deleteU = async(id) =>{
    await $authHost.delete(`/api/user/${id}`);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const findUserById = async (id) => {
    const {data} = await $host.get(`api/user/${id}`);
    return data;
}

export const getAllUsers = async() => {
    const {data} = await $authHost.get(`api/user/get-all`);
    return data;
}