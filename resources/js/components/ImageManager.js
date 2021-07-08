import React from "react";
import { Row, Container, Col, Button, Form } from "react-bootstrap";
import ImageManagerHandler from "../../classes/ImageManagerHandler";

class ImageManager extends React.Component {
    imageManger = new ImageManagerHandler();

    state = {
        selectedImages: [],
        isUploading: false,
    };

    handleImageSelection = (event) => {
        console.log("File Selection ");
        console.log(event.target.files);
        this.setState({ selectedImages: event.target.files });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

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

        const response = await this.imageManger.uploadImages(imagesFormData);

        console.log("Sucess array ", this.imageManger.uploadedImages);
        console.log("Failed array ", this.imageManger.faileUploadedImages);
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
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
                    </Col>
                </Row>
                <></>
            </Container>
        );
    }
}

export default ImageManager;
