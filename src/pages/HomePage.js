import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate()

    return (
        <div>
            <Button onClick={()=> navigate("/user/3")}> User 3</Button>
        </div>
    );
};

export default HomePage;