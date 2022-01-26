import {makeAutoObservable} from "mobx";
import {getAllCollections} from "../http/collectionApi";
import collection from "../pages/Collection";

export default class CollectionStore{
     constructor() {
        this._collections = []
        makeAutoObservable(this)
    }

    setCollections(collections){
         console.log(collections)
         this._collections = collections;
    }

    getByUserID(userID){
        const result = this._collections.filter(collection => collection.userId === userID);
        return result;
    }

    getOneByID(id){
        return this._collections.filter(collection => collection.id === id);
    }
    getCollections(){
        return this._collections;
    }
}