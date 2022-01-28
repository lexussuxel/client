import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {findCollectionById} from "../http/collectionApi";
import {Context} from "../index";
import {Button, Col, Container, Row} from "react-bootstrap";
import NavigateItems from "../components/NavigateItems";
import ItemList from "../components/ItemList";
import ItemInputModal from "../components/ItemInputModal";
import {CreateItem, DeleteItem, getItemInCollection} from "../http/itemAPI";
import {observer} from "mobx-react-lite";


const Collection = observer(() => {

    const {user} = useContext(Context)
    const navigate  = useNavigate();
    const [itemVisible, setItemVisible] = useState(false)
    const Hide = () => {
        setItemVisible(false)
    }
    const {id} = useParams();
    const [collection, setCollection] = useState({}) ;
    const getCollection = async() => {
        setCollection(await findCollectionById(id));
    }
    const [items, setItems] = useState([]);

    useEffect(
        async() =>
            setItems(await getItemInCollection(id)),
        [id])

    const CreateItem1 = async (name, description, image) => {

        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('img', image)
        formData.append('collectionId', id)
        await CreateItem(formData, id).then(data => setItemVisible(false))
        setItems(await getItemInCollection(id))

    }

    const DeleteI = async (item) => {
        console.log(item)
        await DeleteItem(item).then(async () => setItems(await getItemInCollection(id)))
        console.log("aaaaa")
    }

    useMemo(getCollection, [id]);
    return (
        <Container>
            <Row>
                <div>
                    <br/>

                    <h1 style={{display:"inline"}}>{collection.name}</h1>
                    {(collection.userId === user.user.id)?
                        <Button variant={'outline-dark'} style={{width: 200, position:"absolute", right: 110}} onClick={()=>setItemVisible(true)}>Create Item</Button>
                        : null
                    }
                </div>

                <h4>{collection.description}</h4>
                <hr/>
                <Row>
                    <Col md={3}>
                        <NavigateItems items={items} />

                    </Col>
                    <Col md={9}>
                        <ItemList items={items} deleteI={DeleteI}/>
                    </Col>

                </Row>

            </Row>
            <ItemInputModal show={itemVisible} onHide={Hide} create={CreateItem1}/>
        </Container>
    );
});

export default Collection;