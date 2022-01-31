import React, {useState} from 'react';
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const TagBar =observer( ({tags}) => {
    const [selectedItemId, setSelectedItemId] = useState();
    return (
        <ListGroup className="mt-4">
            {tags.map(item =>
                <ListGroup.Item active={item.id === selectedItemId} style={{justifyContent:"center", cursor: "progress"}} onClick={() => setSelectedItemId(item.id)}>{item.name}</ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TagBar;