import React from "react";
import {
    Row,
    Container,
    Col,
    Button,
    Form,
    Spinner,
    Alert,
} from "react-bootstrap";
import ImageManagerHandler from "../../classes/ImageManagerHandler";
import { DragNDrop } from "./dragNDropForm";

class ImageManager extends React.Component {
    imageManger = new ImageManagerHandler();

    state = {
        selectedImages: [],
        isUploading: false,
        showErrorMessage: false,
        showSuccessMessage: false,
        useDragNDrop: false,
        showUploadForms: false,
    };

    handleImageSelection = (event) => {
        console.log("File Selection ");
        console.log(event.target.files);
        this.setState({ selectedImages: event.target.files });
    };

    handleImageSelectionDragNDrop = (acceptedFiles) => {
        console.log("File Selection DRANG AND DROP");
        console.log(acceptedFiles);
        this.setState({ selectedImages: acceptedFiles });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isUploading: true });
        const imagesFormData = new FormData();
        const temporalArrayImage = [];
        const selectedImages = this.state.selectedImages;
        console.log("Selected Images from State ", selectedImages);

        Array.from(selectedImages).forEach((image) => {
            temporalArrayImage.push(image);
            imagesFormData.append("imagesToUpload[]", image);
        });

        for (var value of imagesFormData.values()) {
            console.log("FORM DATA VALUE", value);
        }

        await this.imageManger.uploadImages(imagesFormData);

        const stateToChange = { isUploading: false };
        if (this.imageManger.uploadedImages.length > 0) {
            stateToChange.showSuccessMessage = true;
        }

        if (this.imageManger.faileUploadedImages.length > 0) {
            stateToChange.showErrorMessage = true;
        }
        this.setState(stateToChange);
        console.log("Sucess array ", this.imageManger.uploadedImages);
        console.log("Failed array ", this.imageManger.faileUploadedImages);
    };

    renderSuccessUpload = () => {
        if (this.state.showSuccessMessage) {
            return (
                <Alert variant="success">Images where uploaded correctly</Alert>
            );
        }
    };

    renderFailedUpload = () => {
        if (this.state.showErrorMessage) {
            return <Alert variant="danger">Failed to upload the images</Alert>;
        }
    };

    renderNormalForm = () => {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.File
                        accept=".png"
                        label="Select png image"
                        multiple
                        className="bg-gradient-theme-left border-0"
                        name="imagesToUpload"
                        onChange={this.handleImageSelection}
                    />
                </Form.Group>

                <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-theme-left border-0"
                    block
                    onClick={this.handleSubmit}
                >
                    Upload
                </Button>
            </Form>
        );
    };

    setFormToShow = (event) => {
        const showForm = {
            useDragNDrop: false,
            showUploadForms: true,
        };

        if (event.target.name === "dragNDropForm") {
            showForm.useDragNDrop = true;
        }

        this.setState(showForm);
    };

    render() {
        const spinnerAmount = [...Array(5).keys()];
        console.log("SPINNER ", spinnerAmount);
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h3>Image Uploader</h3>
                    </Col>
                </Row>
                <Row className="pb-3">
                    <Col xs lg="6">
                        <Button
                            variant="primary"
                            onClick={this.setFormToShow}
                            name="normalForm"
                        >
                            With usual form
                        </Button>
                    </Col>
                    <Col xs lg="6">
                        <Button
                            variant="primary"
                            onClick={this.setFormToShow}
                            name="dragNDropForm"
                        >
                            With drag N drop
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {!this.state.useDragNDrop &&
                            this.state.showUploadForms &&
                            this.renderNormalForm()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.useDragNDrop &&
                            this.state.showUploadForms && (
                                <DragNDrop
                                    handleImageSelectionDragNDrop={
                                        this.handleImageSelectionDragNDrop
                                    }
                                    handleSubmit={this.handleSubmit}
                                />
                            )}
                    </Col>
                </Row>
                {this.state.isUploading && (
                    <Row className="pt-3">
                        <Col xs lg="4">
                            <label>Uploading</label>
                        </Col>
                        <Col xs lg="8">
                            {spinnerAmount.map((number) => {
                                return (
                                    <Spinner
                                        className="mr-2"
                                        key={number}
                                        animation="grow"
                                        variant="primary"
                                    />
                                );
                            })}
                        </Col>
                    </Row>
                )}

                <Row className="pt-3">
                    <Col>{this.renderFailedUpload()}</Col>
                </Row>

                <Row className="pt-3">
                    <Col>{this.renderSuccessUpload()}</Col>
                </Row>
            </Container>
        );
    }
}

export default ImageManager;
