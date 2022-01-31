import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import ItemList from "../components/ItemList";
import ShowItemModal from "../components/ShowItemModal";
import {Context} from "../index";
import {CreateItem, DeleteItem, getItemInCollection, getLast} from "../http/itemAPI";
import {deleteCollection, findCollectionById, getBiggest, getUserCollections} from "../http/collectionApi";
import OneCollection from "../components/OneCollection";
import TagBar from "../components/TagBar";

const HomePage = () => {
    const {user} = useContext(Context)
    const [items, setItems] = useState([])
    const [collections, setCollections] = useState([])
    const [showItemVisible, setShowItemVisible] = useState(false)
    const [getItem, setGetItem] = useState({});
    const showHide = () => {
        setShowItemVisible(false)
    }
    const {id} = useParams();


    const openItem = (item) => {
        setGetItem(item)
        setShowItemVisible(true)
    }
    const DeleteI = async (item) => {
        await DeleteItem(item).then(async () => setItems(await getItemInCollection(id)))
    }
    useEffect(
        async() =>{
            setCollections(await getBiggest())
            setItems(await getLast())},
        [user.isAuth])

    const deleteCollections = async (delId) => {
        await deleteCollection(delId).then(async () => setCollections(await getLast()))
    }


    const navigate = useNavigate()

    return (
        <Container>
            <Row>
                <Col md={10}>
                    <Card className="m-auto mt-4">
                        <Card.Header>Last added items</Card.Header>
                        <Card.Body>
                            <ItemList items={items} getItem={openItem} deleteI={DeleteI} />
                        </Card.Body>
                    </Card>


                    <Card className="m-auto mt-4">
                        <Card.Header>Collections with biggest count of items</Card.Header>
                        <Card.Body>
                            {collections.map((collection) =>
                                <OneCollection collection={collection} id={collection.userId} deleteCollections={deleteCollections}/>)}

                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <TagBar tags={items}/>
                </Col>
            </Row>
            <ShowItemModal show={showItemVisible} onHide={showHide} item={getItem} deleteI={DeleteI} addComments={false} />
        </Container>
    );
};

export default HomePage;