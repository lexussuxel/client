import React, {useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import {getItemInCollection} from "../http/itemAPI";
import {findUserById} from "../http/userAPI";


const NavigateItems = observer(() => {
    const {id} = useParams();
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState();

    const getItems= async() => {
        setItems(await getItemInCollection(id));

    }
    useMemo(getItems, [id]);
    return (
        <ListGroup>
            {items.map(item =>
                <ListGroup.Item active={item.id === selectedItemId} style={{justifyContent:"center", cursor: "progress"}} onClick={() => setSelectedItemId(item.id)}>{item.name}</ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default NavigateItems;