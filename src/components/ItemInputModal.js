import React, {useState} from 'react';
import {Button, Card, Form, Modal} from "react-bootstrap";



const ItemInputModal = ({show, onHide, create}) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [drag, setDrag] = useState(false);

    const setFile = (e) => {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

    function dragStartHandler(e) {
        e.preventDefault();
        setDrag(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault();
        setDrag(false)
    }

    function dropHandler(e) {
        e.preventDefault()

        setImage(e.dataTransfer.files[0])
        setDrag(false)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-2"
                        placeholder="Enter name of item"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-2"
                        type="text"
                        placeholder="Do you want to describe your item?"
                    />
                    {drag?
                        <Card onDragStart={(e)=>dragStartHandler(e)}
                              onDragLeave={(e)=>dragLeaveHandler(e)}
                              onDragOver={(e)=>dragStartHandler(e)}
                              onDrop={(e)=> dropHandler(e)}
                              className="d-flex justify-content-center text-center mt-2"
                              style={{height:300, borderWidth:2, borderColor:"darkgrey", borderStyle:"dashed"}}>
                            let go file
                        </Card>
                        :
                        <Card onDragStart={(e)=>dragStartHandler(e)}
                              onDragLeave={(e)=>dragLeaveHandler(e)}
                              onDragOver={(e)=>dragStartHandler(e)}
                              className="d-flex justify-content-center text-center mt-2"
                              style={{height:300, borderWidth:2, borderColor:"darkgrey"}}>
                            put your file here
                        </Card>
                    }
                    <Form.Control
                        onChange={e => setFile(e)}
                        className="mt-2"
                        type="file"
                    />


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={() => {create(name, description, image); setDescription(""); setName(""); setImage("");onHide()}}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ItemInputModal;