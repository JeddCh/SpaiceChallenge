import { useState, useRef, useContext, useEffect } from "react";
import { Card, Accordion } from "react-bootstrap";
import Collapsible from "react-collapsible";
import { UserContext } from "../../UserContext";

import "bootstrap/dist/css/bootstrap.min.css";

const Node = ({ child }) => {
    const hasChild = typeof child === "object" ? true : false;
    const { user } = useContext(UserContext);

    if (hasChild) {
        let heading = Object.entries(child).map((key, child) => {
            return (
              <Card style={{ textAlign: 'left' }}>
					<br />
					<Collapsible trigger={key[0]}>
						<Card>
							<Card.Header data-testid="subHeading" style={{ textAlign: 'center' }}>
								<Node data-testid="node" child={key[1]}></Node>
							</Card.Header>
						</Card>
					</Collapsible>
					<br />
				</Card>
            );
        });
        return heading;
    }

    return (
        <Card.Body>
            {user ? (
                <EditText edit={child} />
            ) : (
                `${child.toString()}  (${typeof child})`
            )}
        </Card.Body>
    );
};

const EditText = ({ edit }) => {
    const ref = useRef(null);
    const [text, setText] = useState(edit);
    const [visible, setVisible] = useState(false);

    function onClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            if (typeof edit === "boolean") {
                if (ref.current.value.toLowerCase() === "true") {
                    setText(true);
                } else if (ref.current.value.toLowerCase() === "false") {
                    setText(false);
                }
            }

            setVisible(false);
        }
    }

    useEffect(() => {
        if (visible) {
            document.addEventListener("mousedown", onClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    });

    return (
        <>
            {visible ? (
                <input
                    type={typeof edit}
                    ref={ref}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
            ) : (
                <span onClick={() => setVisible(true)}>
                    {text.toString()} ({typeof text})
                </span>
            )}
        </>
    );
};

const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
};

export default function Tree() {
    const [tree, setTree] = useState([null]);

    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            var obj = JSON.parse(e.target.result);
            setTree(obj);
        };
    };

    const exportToJson = (e) => {
        e.preventDefault();
        downloadFile({
            data: JSON.stringify(tree),
            fileName: "tree.json",
            fileType: "text/json",
        });
    };

    if (tree[0] === null) {
        return (
            <>
                <br />
                <Card>
                    <Card.Header>
                        Upload a Json to view the tree structure
                        <Card.Body>
                            <input type="file" onChange={handleChange} />
                        </Card.Body>
                    </Card.Header>
                </Card>
            </>
        );
    } else {
        return (
            <div>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Title>Json Tree</Card.Title>

                        <Card.Text>Welcome to the admin dashboard!</Card.Text>
                    </Card.Body>
                </Card>
                <br />

                <div className="App">
                    {Object.entries(tree).map((key, value) => (
                        <Accordion defaultActiveKey="default">
                            <Accordion.Item eventKey={key[0]}>
                                <Accordion.Header>{key[0]}</Accordion.Header>
                                <Accordion.Body>
                                    <Node child={key[1]}></Node>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </div>

                <br />
                <div className="actionBtns">
                    <button type="button" onClick={exportToJson}>
                        Export to JSON
                    </button>
                </div>
            </div>
        );
    }
}
