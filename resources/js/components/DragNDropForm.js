import React from "react";
import { useDropzone } from "react-dropzone";
import { Button, Col, Row, Form, Alert } from "react-bootstrap";

export function DragNDrop(props) {
    const onDrop = React.useCallback((acceptedDroppedFiles) => {
        console.log("__________________ACELTES FILES", acceptedDroppedFiles);
        props.handleImageSelectionDragNDrop(acceptedDroppedFiles);
    }, []);

    const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
        useDropzone({
            accept: "image/png",
            onDrop,
        });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e) => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    return (
        <Form
            onSubmit={(event) => {
                props.handleSubmit(event);
                acceptedFiles.length = 0;
            }}
            id="uploadForm"
        >
            <Form.Group>
                <Row>
                    <Col>
                        <section>
                            <div
                                {...getRootProps({
                                    className:
                                        "bg-light.bg-gradient border border-danger border-2 rounded",
                                })}
                            >
                                <input {...getInputProps()} />
                                <p>
                                    Drag N drop some files here, or click to
                                    select files
                                </p>
                                <em>(Only*.png images will be accepted)</em>
                            </div>
                            <aside className="pt-3">
                                <Alert variant="success">
                                    <label>To Upload</label>
                                    <ul>{acceptedFileItems}</ul>
                                </Alert>
                                <Alert variant={"danger"}>
                                    <label>Rejected</label>
                                    <ul>{fileRejectionItems}</ul>
                                </Alert>
                            </aside>
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            type="submit"
                            size="lg"
                            className="bg-gradient-theme-left border-0"
                            block
                            onClick={props.handleSubmit}
                        >
                            Upload
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}
