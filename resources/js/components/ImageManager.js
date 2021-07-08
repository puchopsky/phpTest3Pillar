import React from "react";
import {
    Row,
    Container,
    Col,
    Button,
    Form,
    InputGroup,
    FormControl,
} from "react-bootstrap";
import UserAuthHandler from "../../classes/UserAuthHandler";

class ImageManager extends React.Component {
    userAuthHandler = new UserAuthHandler();

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        console.log("User Info ", user);
        await this.userAuthHandler.loginUser(user);

        if (this.userAuthHandler.userLoggedIn === true) {
            console.log("User Logged correctly going for allowed images");
            // window.location.href = "http://www.w3schools.com";
        }
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
