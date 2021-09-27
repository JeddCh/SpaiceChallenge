import "./App.css";
import { Col, Container, Navbar, Row, Nav } from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import React, { useState, useMemo } from "react";
import { UserContext } from "./UserContext";

import Tree from "./Components/Tree/Tree";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Authorization/Login/Login";
import Register from "./Components/Authorization/Register/Register";
import DashBoard from "./Components/DashBoard/DashBoard";
import ProtectedRoute from "./protectedRoute";

function App() {
    const [user, setUser] = useState(false);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand>Spaice Engineering Challenge</Navbar.Brand>
                </LinkContainer>

                {!user ? (
                    <Nav className="mr-auto">
                        <LinkContainer to="/Login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Register">
                            <Nav.Link>Register</Nav.Link>
                        </LinkContainer>
                    </Nav>
                ) : (
                    <Nav className="loggedIn">
                        <LinkContainer to="/DashBoard">
                            <Nav.Link>DashBoard</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Nav.Link
                                onClick={() => {
                                    setUser(false);
                                }}
                            >
                                Log Out
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                )}
            </Navbar>

            <Container>
                <Row>
                    <Col>
                        <UserContext.Provider value={value}>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Redirect push to={"/tree"} />
                                    )}
                                />

                                <Route exact path="/tree" component={Tree} />

                                <Route exact path="/Login" component={Login} />

                                <Route
                                    exact
                                    path="/Register"
                                    component={Register}
                                />

                                <ProtectedRoute
                                    exact
                                    path="/DashBoard"
                                    component={DashBoard}
                                />

                                <Route render={() => <NotFound />} />
                            </Switch>
                        </UserContext.Provider>
                    </Col>
                </Row>
            </Container>

            <br />
        </>
    );
}

export default App;
