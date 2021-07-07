import React from "react";
import {
    Card,
    Row,
    Container,
    Col,
    Button,
    Form,
    InputGroup,
    FormControl,
} from "react-bootstrap";

class Login extends React.Component {
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
        await this.loginHelper.loginUser(user);

        if (this.loginHelper.userLoggedIn === true) {
            this.props.SetUserInfo(this.loginHelper.loggedUserInfo);
            this.props.history.push("/catalogos/tiposdecarga");
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
            </Container>
        );
    }
}

export default Login;
