import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";


const ItemInputModal = ({show, onHide, create}) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
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
                    <Form.Control
                        onChange={e => setImage(e.target.files[0])}
                        className="mt-2"
                        type="file"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={() => {create(name, description, image); onHide()}}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ItemInputModal;