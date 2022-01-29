import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import defImage from "../assets/image.png";
import {Context} from "../index";
import {comment, getComments} from "../http/commentAPI";
import Markdown from 'markdown-to-jsx';
import Comment from "./Comment";

const ShowItemModal = ({show, item, onHide, deleteI, addComments}) => {
    const {user} = useContext(Context)
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState();
    useEffect(async()=>{
        setComments(await getComments(item.id))
    }, [])

    const makeComment = async() =>{
        await comment(user.user.id,item.id,commentText)
        setCommentText("")
        setComments(await getComments(item.id))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            className="d-flex"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    <h1>{item.name}</h1>

                </Modal.Title>
                {user.user.id === item.userId ?
                    <Button variant="warning" className='m-auto' onClick={() => deleteI(item)}>delete item</Button>
                    :null
                }
            </Modal.Header>
            <Modal.Body >

                    {item.img !== "null"?
                        <Image width={400} height={400} src={process.env.REACT_APP_API_URL + item.img} />
                        :<Image width={400} height={400} src={defImage} />
                    }
                    <hr/>
                <h5>Description:</h5>
                <Markdown>{item.description}</Markdown>
                {addComments?<div>
                <br/><br/><br/>
                {user.isAuth?
                <Form >
                    <Form.Control
                        className="mt-2"
                        placeholder="comment....."
                        value={commentText}
                        as="textarea" rows={3}
                        onChange={e => setCommentText(e.target.value)}
                    />
                    <Button variant="secondary" className="m-auto" onClick={()=>makeComment()}>send</Button>
                </Form>:null}
                </div>:null}
            </Modal.Body>
            <Modal.Footer>

                {addComments? comments.map((comment) =>
                   <Comment comment={comment}/>
                ):null}
            </Modal.Footer>
        </Modal>
    );
};

export default ShowItemModal;