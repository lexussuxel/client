import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, Image, Row} from "react-bootstrap";
import {COLLECTIONS_ROUTE} from "../util/constants";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";

import Like from "./Like";

const OneCollection = ({collection, deleteCollections, id}) => {
    console.log(collection.id)
    const {user} = useContext(Context);

    const navigate = useNavigate();

    return (
        <Row>
            <div>


                {collection.private?
                    (Number(id) === Number(user.user.id))?
                    <div className="d-grid gap-2">
                        <hr style={{color: "black", height: 2}}/>
                        <Button variant="outline-dark" onClick={() => navigate(COLLECTIONS_ROUTE+`/${collection.id}`)}>{collection.name}</Button>
                        <div className="d-flex justify-content-end">
                            <div style={{color: "grey"}}>
                                private
                            </div>
                        </div>
                        <p>{collection.description}</p>
                    </div>:null:
                    <div className="d-grid gap-2">
                        <hr style={{color: "black", height: 2}}/>
                        <Button variant="secondary" onClick={() => navigate(COLLECTIONS_ROUTE+`/${collection.id}`)}>{collection.name}</Button>
                        <p>{collection.description}</p>
                       <Like collection={collection}/>
                    </div>
                }



            </div>
                {(Number(id) === Number(user.user.id))?
                    <div>
                        <Button className="float-end p-lg-0" variant="link" style={{color: "red"}} size="sm" onClick={ () =>deleteCollections(collection.id)}>delete collection</Button>
                        <br/>
                    </div>:null}

        </Row>

    );
};

export default OneCollection;