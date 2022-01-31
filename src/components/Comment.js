import React from 'react';
import {Button, Card, Container} from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import {useNavigate} from "react-router-dom";

const Comment = ({comment}) => {
    const navigate = useNavigate()
    return (
        <Container>
            <Card>
                <Card.Header>
                    <Button variant="link" onClick={()=> navigate(`/user/${comment.userId}`)}>{comment.userName}</Button>
                </Card.Header>
                <Card.Body>
                    <Markdown>{comment.text}</Markdown>
                </Card.Body>

            </Card>
        </Container>
    );
};

export default Comment;