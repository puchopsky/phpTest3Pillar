import React from "react";
import {
    Row,
    Container,
    Col,
    Button,
    Form,
    InputGroup,
    FormControl,
    Alert,
} from "react-bootstrap";
import UserAuthHandler from "../../classes/UserAuthHandler";

class Login extends React.Component {
    userAuthHandler = new UserAuthHandler();

    state = {
        showLoginError: false,
        showErrorMessage: false,
    };

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

        await this.userAuthHandler.loginUser(user);

        if (this.userAuthHandler.userLoggedIn === true) {
            window.location.href = "http://localhost/image-handler";
        } else {
            this.setState({ showLoginError: true, showErrorMessage: true });
        }
    };

    renderLoginError = () => {
        if (this.state.showErrorMessage) {
            setTimeout(() => {
                this.setState({ showErrorMessage: false });
            }, 4000);
            return (
                <Alert variant="danger">Email or password is incorrect!</Alert>
            );
        }
    };

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

                            <InputGroup className="mb-4">
                                <InputGroup.Text id="basic-addon1">
                                    Password :{" "}
                                </InputGroup.Text>
                                <FormControl
                                    placeholder="your pasword"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    type="password"
                                    name="password"
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
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="pt-3">
                    <Col>{this.renderLoginError()}</Col>
                </Row>
            </Container>
        );
    }
}

export default Login;
