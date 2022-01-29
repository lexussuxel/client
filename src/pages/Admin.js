import React, {useEffect, useState} from 'react';
import {getAllUsers, update} from "../http/userAPI";
import {Button, Container, Dropdown, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {USER_ROUTE} from "../util/constants";

const Admin = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(async()=> {
        setUsers(await getAllUsers())
    }, [])

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
                {users.map((user)=>
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