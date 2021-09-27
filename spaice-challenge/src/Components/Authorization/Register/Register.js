import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../UserContext";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    const register = () => {
        Axios.post("http://localhost:3001/register", {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setUser(true);
                history.push("/tree");
            } else {
                alert("Account Already Exists");
            }
        });
    };

    return (
        <div className="Register">
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Button
                    block
                    size="lg"
                    type="submit"
                    disabled={!validateForm()}
                    onClick={register}
                >
                    Register
                </Button>
            </Form>
        </div>
    );
}
