import React from "react";
import { Button, Form } from "react-bootstrap";

export function NormalUploadForm(props) {
    return (
        <Form onSubmit={props.handleSubmit} id="uploadForm">
            <Form.Group>
                <Form.File
                    accept=".png"
                    label="Select png image"
                    multiple
                    className="bg-gradient-theme-left border-0"
                    name="imagesToUpload"
                    onChange={props.handleImageSelection}
                />
            </Form.Group>

            <Button
                type="submit"
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={props.handleSubmit}
            >
                Upload
            </Button>
        </Form>
    );
}
