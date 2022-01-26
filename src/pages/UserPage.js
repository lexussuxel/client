import React, {useContext, useMemo, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {findUserById} from "../http/userAPI";
import {Button, Col, Container, Nav, Row} from "react-bootstrap";

import {COLLECTIONS_ROUTE} from "../util/constants";
import {findCollectionById, getUserCollections, deleteCollection} from "../http/collectionApi";
import collection from "./Collection";
import OneCollection from "../components/OneCollection";


const UserPage = (props) => {

    const {user} = useContext(Context)
    const navigate = useNavigate();
    const {id} = useParams();
    const [useUser, setUseUser] = useState({email:"lala"}) ;
    const [collections, setCollections] = useState([]);
    //const [delId, setDelId] = useState()
    const getUser = async() => {
        console.log("as")
        setUseUser(await findUserById(id));

    }
    useMemo(getUser, [id]);

    const deleteCollections = async (delId) => {
        console.log(delId)
        await deleteCollection(delId);
        await getCollections();


    }

    const getCollections = async() => {
        setCollections(await getUserCollections(id));

    }
    useMemo(getCollections, [id]);

    return (
        <Container >
            <div className="m-lg-4">
                <h1>{useUser.name}</h1>
                <h4>{useUser.email}</h4>
            </div>
            <p>Collections:</p>
            {collections.map((k) =>
              <OneCollection collection={k} id={id} deleteCollections={deleteCollections}/>
                )}

        </Container>
    );
};

export default UserPage;