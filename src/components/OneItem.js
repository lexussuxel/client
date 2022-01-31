import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import defImage from "../assets/image.png"
import {Context} from "../index";


const OneItem = ({item, deleteI, getItem}) => {

    const {user} = useContext(Context)

    return (
        <Col md={3}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"} >
                <Row onClick={()=>{getItem(item)}}>
                {item.img !== "null"?
                    <Image width={150} height={150} src={item.img}/>
                    :
                    <Image width={150} height={150} src={defImage}/>
                }
                <div className="d-flex align-self-center">
                    {item.name}
                </div></Row>
                {user.user.id === item.userId ?
                    <Button variant="outline-danger" className="mb-3" onClick={() => deleteI(item)}>delete item</Button>
                    :null
                }
            </Card>
        </Col>
    );
};

export default OneItem;