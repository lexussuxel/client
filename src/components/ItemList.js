import React, {useContext, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getItemInCollection} from "../http/itemAPI";
import {useParams} from "react-router-dom";
import {Row} from "react-bootstrap";
import OneItem from "./OneItem";

const ItemList = observer(() => {

    const [items, setItems] = useState([]);
    const {id} = useParams();
    const getItems = async () => {
        setItems(await getItemInCollection(id))
    }

    useMemo(getItems, [id])


    return (
        <Row className="d-flex">
            {items.map(item =>
                <OneItem key={item.id} item={item}/>
            )}
        </Row>
    );
});

export default ItemList;