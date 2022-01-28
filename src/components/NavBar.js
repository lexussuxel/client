import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Form, FormControl, Navbar} from "react-bootstrap";
import { useNavigate} from "react-router-dom"
import {Nav, NavLink} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {ADMIN_ROUTE, AUTH_ROUTE, COLLECTION_CREATE_ROUTE, HOMEPAGE_ROUTE} from "../util/constants";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{color:"white", textUnderlineOffset:"-moz-initial"}} onClick={() => navigate(HOMEPAGE_ROUTE)}>Collections for u</NavLink>

                    {user.isAuth ?
                        <Nav className="ml-auto" >
                            <Button variant={"outline-secondary"} className="m-2" onClick={() => navigate(`/user/${user.user.id}`)}>My Page</Button>
                            <Button variant={"outline-secondary"} className="m-2" onClick={() => navigate(COLLECTION_CREATE_ROUTE)} >Create new collection</Button>
                        </Nav>
                        :
                        <Nav className="ml-auto" >
                            <Button variant={"outline-secondary"} className="m-2" onClick={() => navigate(AUTH_ROUTE)}>Log in</Button>
                        </Nav>}
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="secondary">Search</Button>
                    </Form>
                    {user.user.role === "ADMIN"?
                        <Nav className="ml-auto" >
                            <Button variant={"outline-secondary"} className="m-2" onClick={() => navigate(ADMIN_ROUTE)}>Admin page</Button>
                        </Nav>:null
                    }
                    {user.isAuth?
                        <Button variant={"outline-secondary"} className="m-2" onClick={() => {user.setIsAuth(false); user.setUser({}); localStorage.setItem('token', "");navigate(HOMEPAGE_ROUTE)}}>Exit</Button>
                        :null
                    }
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;