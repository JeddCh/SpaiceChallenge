import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const { user } = useContext(UserContext);
    const isLogged = user === false;
    let history = useHistory();

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isLogged ? <Component {...props} /> : history.push("/tree")
            }
        />
    );
}

export default ProtectedRoute;
