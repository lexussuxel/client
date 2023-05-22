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
        console.log(comments)
    }, [item])

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
                    <Button variant="warning" className='m-auto' onClick={() => {deleteI(item);onHide()}}>delete item</Button>
                    :null
                }
            </Modal.Header>
            <Modal.Body >

                    {item.img !== "null"?
                        <Image width={400} height={400} src={process.env.REACT_APP_API_URL+"/"+item.img} />
                        :<Image width={400} height={400} src={defImage} />
                    }
                    <hr/>
                <h5>Description:</h5>
                <Markdown>{item.description}</Markdown>
                {addComments?<div>
                {(user.isAuth && user.user.state)? <div>
                    <br/><br/><br/>
                <Form >
                    <Form.Control
                        className="me-2"
                        placeholder="comment..... markdown is used here"
                        value={commentText}
                        as="textarea" rows={3}
                        onChange={e => setCommentText(e.target.value)}
                    />
                    <Button variant="secondary" className="m-auto" onClick={()=>makeComment()}>send</Button>
                </Form></div>:null}
                </div>:null}
            </Modal.Body>
            <Modal.Footer>
                {addComments?(comments.length)?
                        comments.map((comment) =>
                            <Comment comment={comment}/>):<p>There is no comments</p>
                :null}
            </Modal.Footer>
        </Modal>
    );
};

export default ShowItemModal;