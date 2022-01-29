import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        this.a = true

        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }
    setUser(user){
        this._user = user;
    }
    setA(bool){
        this.a = bool;
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }
}