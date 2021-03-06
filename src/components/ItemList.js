import React, {useContext, useEffect, useMemo, useState} from 'react';
import {observer} from "mobx-react-lite";
import {getItemInCollection} from "../http/itemAPI";
import {useParams} from "react-router-dom";
import {Row} from "react-bootstrap";
import OneItem from "./OneItem";

const ItemList = observer(({items, deleteI,getItem}) => {



    return (
        <Row className="d-flex">
            {items.map(item =>
                <OneItem key={item.id} item={item} deleteI={deleteI} getItem={getItem}/>
            )}
        </Row>
    );
});

export default ItemList;