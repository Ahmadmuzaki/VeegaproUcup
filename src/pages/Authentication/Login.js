import React, { Component } from 'react';

import { Row, Col, Input, Button, Alert, Container, Label } from "reactstrap";
import 'toastr/build/toastr.min.css'
import toastr from 'toastr'


// Redux
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';
import veegalogo from "../../assets/images/vega.png";
// actions
import { checkLogin, apiError } from '../../store/actions';

// import images
import { post } from '../../helpers/api_helper';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
            indomie: []
        }
        this.handleCustom = this.handleCustom.bind(this);

    }

    async handleCustom(event, values) {
        const indomie = await post('/login', values)
        this.setState({ indomie })

        if (indomie.code === 200) {
            localStorage.setItem('token', indomie.token)
            this.props.checkLogin(values, this.props.history);
            // return <Redirect to='/dashboard' />;
            window.location.reload(false)

        } else {
            toastr.options = {
                positionClass: "toast-bottom-left"
            }
            toastr.error(indomie.message)
        }

    }

    handleSubmit(event, values) {
        this.props.checkLogin(values, this.props.history);
    }

    componentDidMount() {
        this.props.apiError("");
        document.body.classList.add("auth-body-bg");
        // console.log("Hancur Hancur",this.state.indomie);
    }

    componentWillUnmount() {
        document.body.classList.remove("auth-body-bg");
    }

    render() {

        if (localStorage.getItem('token')) {
            return <Redirect to='/dashboard' />;
        }

        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col lg={4}>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center">
                                                        <div>
                                                            <center>
                                                                <Link to="/" className='d-flex font-contrax justify-content-center align-items-center' >
                                                                    <img src={veegalogo} alt="" style={{ height: '2rem' }} />
                                                                    <span className='p-2' style={{color:'#188ae2'}}>VEEGA PRO</span>
                                                                </Link>
                                                            </center>
                                                        </div>
                                                    </div>


                                                    {this.props.loginError && this.props.loginError ? <Alert color="danger">{this.props.loginError}</Alert> : null}

                                                    <div className="p-2 mt-5">
                                                        <AvForm className="form-horizontal" onValidSubmit={this.handleCustom} >

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="email">Email</Label>
                                                                <AvField name="email" value={this.state.email} type="text" className="form-control" id="email" placeholder="Enter username" />
                                                            </div>

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="userpassword">Password</Label>
                                                                <AvField name="password" value={this.state.password} type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                            </div>

                                                            <div className="form-check">
                                                                <Input type="checkbox" className="form-check-input" id="customControlInline" />
                                                                <Label className="form-check-label" htmlFor="customControlInline">Remember me</Label>
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                                                            </div>
                                                        </AvForm>
                                                    </div>

                                                    <div className="mt-5 text-center">
                                                        <p>Don't have an account ? <Link to="/register" className="fw-medium text-primary"> Register </Link> </p>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="authentication-bg">
                                    <div className="bg-overlay"></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { loginError } = state.Login;
    return { loginError };
}

export default withRouter(connect(mapStatetoProps, { checkLogin, apiError })(Login));