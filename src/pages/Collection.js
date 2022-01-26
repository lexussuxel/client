import React, {useContext, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {findCollectionById} from "../http/collectionApi";
import {Context} from "../index";
import {Button, Col, Container, Row} from "react-bootstrap";
import {CREATE_ITEM_ROUTE} from "../util/constants";
import NavigateItems from "../components/NavigateItems";
import ItemList from "../components/ItemList";


const Collection = () => {

    const {user} = useContext(Context)
    const navigate  = useNavigate();
    const {id} = useParams();
    const [collection, setCollection] = useState({email:"lala"}) ;
    const getCollection = async() => {
        setCollection(await findCollectionById(id));
    }

    useMemo(getCollection, [id]);
    return (
        <Container>
            <Row>
                <div>
                    <br/>

                    <h1 style={{display:"inline"}}>{collection.name}</h1>
                    {(collection.userId === user.user.id)?
                        <Button variant={'outline-dark'} style={{width: 200, position:"absolute", right: 110}} onClick={()=>navigate(CREATE_ITEM_ROUTE)}>Create Item</Button>
                        : null
                    }
                </div>

                <h4>{collection.description}</h4>
                <hr/>
                <Row>
                    <Col md={3}>
                        <NavigateItems />

                    </Col>
                    <Col md={9}>
                        <ItemList />
                    </Col>

                </Row>

            </Row>
        </Container>
    );
};

export default Collection;