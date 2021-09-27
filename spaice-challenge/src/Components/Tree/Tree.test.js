import React from "react";
import ReactDOM from "react-dom";
import Tree from "./Tree";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserContext } from "../../UserContext";

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <UserContext.Provider value={false}>
            <Tree></Tree>
        </UserContext.Provider>,
        div
    );
});
