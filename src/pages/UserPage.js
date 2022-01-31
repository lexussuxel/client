import React, {useContext, useEffect, useMemo, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {findUserById} from "../http/userAPI";
import {Button, Card, Col, Container, Nav, Row} from "react-bootstrap";

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

    useEffect(async()=>{
        setUseUser(await findUserById(id));
        setCollections(await getUserCollections(id));
    }, [id])


    const deleteCollections = async (delId) => {
        await deleteCollection(delId).then(async () => setCollections(await getUserCollections(id)))
    }


    return (
        <Container >
            <div className="m-lg-4">
                <h1>{useUser.name}</h1>
                <h4>{useUser.email}</h4>
            </div>
            {collections.length?<Row>
            <p>Collections:</p>
            {collections.map((k) =>
              <OneCollection collection={k} id={id} deleteCollections={deleteCollections}/>
                )}</Row>:<Card style={{height:500}} className="d-grid justify-content-center"><h1 className="m-auto">user do not have collections!</h1></Card>}

        </Container>
    );
};

export default UserPage;