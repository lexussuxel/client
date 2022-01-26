import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Nav} from "react-bootstrap";
import {Row} from "react-bootstrap"
import {AUTH_ROUTE, REGISTRATION_ROUTE} from "../util/constants";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import jwt_decode from "jwt-decode";


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === AUTH_ROUTE?true:false;
    const [email, setEmail] = useState();
    const [name, setName] = useState()
    const [password, setPassword] = useState();

    const click = async() =>{
        try{
            let data;
            if (isLogin){
                data = await login(email, password)}
            else{
                data = await registration(email, password, name)
            }
            user.setUser(data);
            user.setIsAuth(true)
            navigate(`/user/${data.id}`)
        }catch(e){
            alert(e.response.data.message)
        }
        }


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
           <Card style={{width:600}} className="p-5">
               {isLogin?
                   <h2 className="m-auto">Authorization</h2>
                   :
                   <h2 className="m-auto">Registration</h2>}
               <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-2"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                   <Form.Control
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       className="mt-2"
                       type="password"
                       placeholder="Enter your password..."
                   />

                       {isLogin?


                           <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                           <div>
                               No account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                           </div>

                           </Row>
                           :<div>
                               <Form.Control
                                   value={name}
                                   onChange={e => setName(e.target.value)}
                                   className="mt-2"
                                   placeholder="Enter your name(optional)"
                               />
                               <Row className="d-flex justify-content-between mt-3 pl-3 pr-3"><div>
                           You have an account? <NavLink to={AUTH_ROUTE}>Log in!</NavLink>
                                 </div>
                                </Row>
                                </div>
                       }
                   <Button onClick={click} className="align-self-end" variant="outline-success">
                       Enter
                   </Button>



               </Form>
           </Card>
        </Container>
    );
});

export default Auth;