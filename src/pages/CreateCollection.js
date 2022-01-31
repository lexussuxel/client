import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {AUTH_ROUTE, COLLECTION_CREATE_ROUTE, REGISTRATION_ROUTE} from "../util/constants";
import {Context} from "../index";
import {create, updateCol} from "../http/collectionApi";

const CreateCollection = ({collection}) => {
    const {user} = useContext(Context);
    const [name, setName] = useState();
    const navigate = useNavigate();
    const [description, setDescription] = useState();
    const author = user.user;
    const [addComments, setAddComments] = useState(false);
    const [privatee, setPrivatee] = useState(false);

     useEffect ( ()=> {if(collection){
        setName(collection.name)
        setDescription(collection.description)
        setAddComments(collection.addComments)
        setPrivatee(collection.private)
    }},[])

    const click = async () => {

        try {
            let data = await create(user, name, description, privatee, addComments);
            navigate(`/collections/${data.id}`);
        }catch(e){
            alert(e.response.data.message)
        }
    }

    const click2 = async () => {

        try {
            let data = await updateCol(name, description, addComments, privatee, collection.id);
            navigate(`/user/${collection.userId}`);
        }catch(e){
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width:600}} className="p-5">
                {collection?
                    <h2 className="m-auto">Editing collection</h2>
                :
                    <h2 className="m-auto">Creating collection</h2>}

                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Enter name of your collection"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-2"
                        as="textarea" rows={3}
                        placeholder="Do you want to describe your collection?"
                    />
                    <Form.Group className="p-4">
                        <Form.Check type="switch" label="private collection" onChange={() => {setPrivatee(!privatee)}}/>
                        <Form.Check type="switch" label="add comments"  onChange={() => {setAddComments(!addComments)}}/>
                    </Form.Group>
                    {collection?
                        <Button onClick={click2} className="align-self-end" variant="outline-success">
                            Edit
                        </Button>
                    :
                        <Button onClick={click} className="align-self-end" variant="outline-success">
                            Enter
                        </Button>}




                </Form>
            </Card>
        </Container>
    );
};

export default CreateCollection;