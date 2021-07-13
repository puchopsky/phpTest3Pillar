import React from "react";
import {
    Row,
    Container,
    Col,
    Button,
    Spinner,
    Alert,
    Image,
} from "react-bootstrap";
import ImageManagerHandler from "../../classes/ImageManagerHandler";
import { DragNDrop } from "./DragNDropForm";
import { NormalUploadForm } from "./NormalUploadForm";

class ImageManager extends React.Component {
    imageManger = new ImageManagerHandler();

    state = {
        selectedImages: [],
        uploadedImages: [],
        isUploading: false,
        showErrorMessage: false,
        errorMessage: "There was an error while uploading the images",
        showSuccessMessage: false,
        useDragNDrop: false,
        showUploadForms: false,
        disableUpload: true,
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
        const selectedImages = this.state.selectedImages;
        console.log("Selected Images from State ", selectedImages);

        Array.from(selectedImages).forEach((image) => {
            imagesFormData.append("imagesToUpload[]", image);
        });

        for (var value of imagesFormData.values()) {
            console.log("FORM DATA VALUE", value);
        }

        await this.imageManger.uploadImages(imagesFormData);

        const stateToChange = { isUploading: false };

        if (this.imageManger.wasSucessfulRequest) {
            stateToChange.showSuccessMessage = true;
            stateToChange.uploadedImages = this.imageManger.uploadedImages;
        }

        if (!this.imageManger.wasSucessfulRequest) {
            stateToChange.showErrorMessage = true;
            stateToChange.errorMessage = this.imageManger.errorMessage;
        }
        this.setState(stateToChange);

        document.getElementById("uploadForm").reset();
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
            return (
                <Alert variant="danger">
                    Failed to upload the images {this.state.errorMessage}
                </Alert>
            );
        }
    };

    removeItemFromList = (indexItem) => {
        const uploadedImages = this.state.uploadedImages;
        console.log("Incoming Index ", indexItem);
        console.log("Images uploaded to delte ", uploadedImages);

        uploadedImages.splice(indexItem, 1);
        this.setState({ uploadedImages });
    };

    setFormToShow = (event) => {
        const showForm = {
            useDragNDrop: false,
            showUploadForms: true,
            selectedImages: [],
            uploadedImages: [],
            isUploading: false,
            showErrorMessage: false,
            showSuccessMessage: false,
            errorMessage: "There was an error while uploading the images",
            disableUpload: true,
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
                            this.state.showUploadForms && (
                                <NormalUploadForm
                                    handleSubmit={this.handleSubmit}
                                    handleImageSelection={
                                        this.handleImageSelection
                                    }
                                />
                            )}
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

                <Row>
                    <Col>
                        {this.state.uploadedImages && (
                            <Container>
                                {this.state.uploadedImages.map(
                                    (imageUploaded, index) => (
                                        <Row key={index}>
                                            <Col
                                                key={imageUploaded.imageName}
                                                xs
                                                lg={6}
                                                className="pb-3"
                                            >
                                                <Image
                                                    src={imageUploaded.imageUrl}
                                                    alt={
                                                        imageUploaded.imageName
                                                    }
                                                    thumbnail
                                                />
                                            </Col>
                                            <Col>
                                                <Button
                                                    type="button"
                                                    onClick={(index) => {
                                                        this.removeItemFromList(
                                                            index
                                                        );
                                                    }}
                                                >
                                                    Delete image
                                                </Button>
                                            </Col>
                                        </Row>
                                    )
                                )}
                            </Container>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ImageManager;
