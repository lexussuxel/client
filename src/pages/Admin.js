import React, {useEffect, useState} from 'react';
import {deleteU, getAllUsers, update} from "../http/userAPI";
import {Button, Container, Dropdown, Form, FormControl, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {USER_ROUTE} from "../util/constants";

const Admin = () => {

    const [users, setUsers] = useState([]);
    const [filtredUsers, setFiltredUsers] = useState([])

    const navigate = useNavigate();

    useEffect(async()=> {
        await getAllUsers().then((data)=> {setUsers(data);setFiltredUsers(data)})

    }, [])

    const search = (value) => {
        console.log(value)
        setFiltredUsers(users.filter((user)=> user.email.includes(value)))
    }

    const changeState = async (user, status)=>{
       switch(status){
           case 1:
               if (user.state !== 1){
                   await update(user.id, user.role, true);
                   setUsers(await getAllUsers())
               }
               break;
           case 2:
               if (user.state !== 0){
                   await update(user.id, user.role, false);
                   setUsers(await getAllUsers())
               }
               break;
           case 3:
               await deleteU(user.id);
               setUsers(await getAllUsers())
               break;
       }

    }

    const changeRole = async (user, status) => {
        if (user.role !== status){
            await update(user.id, status, user.state);
            setUsers(await getAllUsers())
        }
    }

    return (
        <Container>

            <h1 className="mt-4">Admin page</h1>
            <Form className="d-flex mb-2">
                <FormControl
                    type="search"
                    placeholder="Search email"
                    onChange={(e)=>search(e.target.value)}
                    className="me-2"
                    aria-label="Search"
                />
            </Form>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>id</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {filtredUsers.map((user)=>
                    <tr>
                        <td>{user.id}</td>
                        <td><Button variant="link" onClick={()=>navigate(`/user/${user.id}`)}>{user.email}</Button></td>
                        <td>{user.name}</td>
                        <td><Dropdown className="d-grid">
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                {user.state?"active":"blocked"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>changeState(user, 1)}>active</Dropdown.Item>
                                <Dropdown.Item onClick={()=>changeState(user, 2)}>blocked</Dropdown.Item>
                                <Dropdown.Item onClick={()=>changeState(user, 3)}>delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown></td>
                        <td><Dropdown className="d-grid " style={{width:100}}>
                            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                {user.role}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>changeRole(user, "USER")}>USER</Dropdown.Item>
                                <Dropdown.Item onClick={()=>changeRole(user, "ADMIN")}>ADMIN</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown></td>
                    </tr>
                )}

                </tbody>
            </Table>

        </Container>
    );
};

export default Admin;