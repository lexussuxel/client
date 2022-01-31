import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {findCollectionById} from "../http/collectionApi";
import {Context} from "../index";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import NavigateItems from "../components/NavigateItems";
import ItemList from "../components/ItemList";
import ItemInputModal from "../components/ItemInputModal";
import {CreateItem, DeleteItem, getItemInCollection} from "../http/itemAPI";
import {observer} from "mobx-react-lite";
import ShowItemModal from "../components/ShowItemModal";
import Markdown from 'markdown-to-jsx';
import CreateCollection from "./CreateCollection";


const Collection = observer(() => {

    const {user} = useContext(Context)
    const navigate  = useNavigate();
    const [itemVisible, setItemVisible] = useState(false)
    const [showItemVisible, setShowItemVisible] = useState(false)
    const [getItem, setGetItem] = useState({});
    const [img, setImg] = useState("");
    const [editModal, setEditModal] = useState(false)
    const showHide = () => {
        setShowItemVisible(false)
    }
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
        const reader = new FileReader();
        if(image) {
            reader.readAsDataURL(image);
            reader.onloadend = () => {
                setImg(reader.result);
            };
            console.log(image)
        } else{
            setImg("null")
        }

        const formData = new FormData()
        formData.append('privatee', collection.private)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('img', img)
        formData.append('collectionId', id)
        console.log("lalalallala")
        console.log("create")
        await CreateItem(formData, id).then(data => setItemVisible(false)).then( async() => setItems(await getItemInCollection(id)))


    }
    const openItem = (item) => {
        setGetItem(item)
        setShowItemVisible(true)
    }
    const DeleteI = async (item) => {
        await DeleteItem(item).then(async () => setItems(await getItemInCollection(id)))
    }

    useMemo(getCollection, [id]);
    return (
        <Container>
            <Row>
                <div>
                    <br/>

                    <h1 style={{display:"inline"}}>{collection.name}</h1>

                    {(collection.userId === user.user.id)?
                       <Row>
                           <Button variant={'outline-dark'} style={{width: 200, position:"absolute", right: 410}} onClick={()=>setEditModal(true)}>Edit collection</Button>
                           <Button variant={'outline-dark'} style={{width: 200, position:"absolute", right: 110}} onClick={()=>setItemVisible(true)}>Create Item</Button>
                       </Row>: null
                    }       <p>Author: <Button variant="link" onClick={()=> navigate(`/user/${collection.userId}`)}>{collection.author}</Button></p>
                </div>

               <h4>{collection.description}</h4>
                <hr/>
                <Row>
                    <Col md={3}>
                        <NavigateItems items={items} />

                    </Col>
                    <Col md={9}>
                        <ItemList items={items} deleteI={DeleteI} getItem={openItem} />
                    </Col>

                </Row>

            </Row>
            <Modal
                show={editModal}
                onHide={() => setEditModal(false)}
                className="d-flex"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <CreateCollection collection={collection}/>
            </Modal>
            <ItemInputModal show={itemVisible} onHide={Hide} create={CreateItem1}/>
            <ShowItemModal show={showItemVisible} onHide={showHide} item={getItem} deleteI={DeleteI} addComments={collection.addComments}/>
        </Container>
    );
});

export default Collection;