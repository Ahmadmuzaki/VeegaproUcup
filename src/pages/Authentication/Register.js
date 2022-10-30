import React, { Component } from "react";
import { Row, Col, Button, Alert, Container, Label } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { registerUser, registerUserFailed, apiError } from '../../store/actions';

// Redux
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// import images
import { post } from "../../helpers/api_helper";

import veegalogo from "../../assets/images/vega.png";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            referral: "",
            placement: "",
            email: "",
            username: "",
            phone: "",
            password: "",
            password_confirmation: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event, values) {
        // console.log(values);
        console.log(values);
        const data = await post('/register', values)
        this.props.registerUser(values)

        if (data.code === 200) {
            return <Redirect to='/login' />;
        }
    }

    componentDidMount() {
        this.props.registerUserFailed("");
        this.props.apiError("");
        document.body.classList.add("auth-body-bg");
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100 h-100">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center font-contrax">
                                                        <img src={veegalogo} alt="" style={{ height: '2rem' }} />
                                                        <span className='p-2' style={{ color: '#188ae2' }}>VEEGA PRO</span>
                                                        <h4 className="font-size-18 mt-4">Register account</h4>
                                                        {/* <p className="text-muted">Get your free Nazox account now.</p> */}
                                                    </div>

                                                    {this.props.user && <Alert color="success">Registration Done Successfully.</Alert>}

                                                    {this.props.registrationError && <Alert color="danger">{this.props.registrationError}</Alert>}

                                                    <div className="p-2 mt-2">
                                                        <AvForm onValidSubmit={this.handleSubmit} className="form-horizontal" >

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="fullname">Fullname</Label>
                                                                <AvField name="fullname" value={this.state.fullname} type="text" className="form-control" id="fullname" placeholder="Input your Fullname" />
                                                            </div>
                                                            <Row>
                                                                <Col xl={6}>
                                                                    <div className="auth-form-group-custom mb-4">
                                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                        <Label htmlFor="referral">Referral</Label>
                                                                        <AvField name="referral" value={this.state.referral} type="text" className="form-control" id="referral" placeholder="Enter Referral" />
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6}>
                                                                    <div className="auth-form-group-custom mb-4">
                                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                        <Label htmlFor="placement">Placement</Label>
                                                                        <AvField name="placement" value={this.state.placement} type="text" className="form-control" id="placement" placeholder="Enter Placement" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="email">Email Address</Label>
                                                                <AvField name="email" value={this.state.email} validate={{ email: true, required: true }} type="email" className="form-control" id="useremail" placeholder="Input your Fullname" />
                                                            </div>
                                                            <Row>
                                                                <Col xl={6}>
                                                                    <div className="auth-form-group-custom mb-4">
                                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                        <Label htmlFor="username">Username</Label>
                                                                        <AvField name="username" value={this.state.username} type="text" className="form-control" id="username" placeholder="Enter username" />
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6}>
                                                                    <div className="auth-form-group-custom mb-4">
                                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                                        <Label htmlFor="phone">phone</Label>
                                                                        <AvField name="phone" value={this.state.phone} type="text" className="form-control" id="phone" placeholder="Enter phone" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xl={6}>
                                                                    <div className="auth-form-group-custom mb-4">
                                                                        <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                        <Label htmlFor="userpassword">Password</Label>
                                                                        <AvField
                                                                            name="password"
                                                                            value={this.state.password}
                                                                            type="password"
                                                                            className="form-control"
                                                                            id="userpassword"
                                                                            placeholder="Enter password"
                                                                        />
                                                                    </div>
                                                                </Col>
                                                                <Col xl={6} className="mb-3">
                                                                    <div className="auth-form-group-custom">
                                                                        <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                        <Label htmlFor="passwordconfirmation">Password Confirmation</Label>
                                                                        <AvField name="password_confirmation" value={this.state.password_confirmation} type="password" className="form-control" id="password_confirmation" placeholder="Enter Confirmation password" />
                                                                    </div>
                                                                    {
                                                                        this.state.password_confirmation === this.state.password_confirmatio ?
                                                                            null
                                                                            :
                                                                            <span className="text-danger">Password Doesn't Match</span>
                                                                    }
                                                                </Col>
                                                            </Row>
                                                            <div className="text-center">
                                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">{this.props.loading ? "Loading ..." : "Sign Up"}</Button>
                                                            </div>
                                                        </AvForm>
                                                    </div>

                                                    <div className="mt-2 text-center">
                                                        <p>Already have an account ? <Link to="/login" className="fw-medium text-primary"> Login</Link> </p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
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

    const { user, registrationError, loading } = state.Account;
    return { user, registrationError, loading };
}

export default connect(mapStatetoProps, { registerUser, apiError, registerUserFailed })(Register);
