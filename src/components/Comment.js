import React from 'react';
import {Button, Container} from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import {useNavigate} from "react-router-dom";

const Comment = ({comment}) => {
    const navigate = useNavigate()
    return (
        <Container>
            <hr/>
            <Button variant="link" onClick={()=> navigate(`/user/${comment.userId}`)}>{comment.userName}</Button>
            <Markdown>{comment.text}</Markdown>
        </Container>
    );
};

export default Comment;