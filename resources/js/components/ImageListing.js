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
import ImageListing from "./ImageListing";

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

    componentDidMount() {}

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <InputGroup className="mb-4 ">
                                <InputGroup.Text id="basic-addon1">
                                    Email :{" "}
                                </InputGroup.Text>
                                <FormControl
                                    placeholder="your email"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    type="email"
                                    name="email"
                                    onChange={this.handleChange}
                                />
                            </InputGroup>

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
                <Row>
                    <Col>
                        <ImageListing />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ImageManager;