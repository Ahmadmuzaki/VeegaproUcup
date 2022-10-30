import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    CardBody, TabContent, TabPane, Nav, NavLink, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Swal from 'sweetalert2'

import classnames from "classnames";
import FormWizard from './FormWizard';
import { TableBankAccount } from './TableBankAccount';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { get, getData, post } from '../../helpers/api_helper';
import axios from 'axios'

const axios2 = axios.create()


export default class index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            customActiveTab: '1',
            current: '',
            newPass: '',
            newConfirmPass: '',
            user: [],
            bank: [],
            updateProfile: false,
            checkPin: '',
            addBankImage: ''
        }
        this.tog_center = this.tog_center.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this)
        this.handleAddBank = this.handleAddBank.bind(this)
        this.handleImageAdd = this.handleImageAdd.bind(this)
    }

    tog_center() {
        this.setState(prevState => ({
            modal_center: !prevState.modal_center
        }));
        this.removeBodyCss();
    }

    removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    toggleCustom(tab) {
        if (this.state.customActiveTab !== tab) {
            this.setState({
                customActiveTab: tab
            });
        }
    }

    handleChangePassword(event, values) {
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        post('/profile/change-password', values, config)
            .then(res => {
                if (res.code === 200) {
                    Swal.fire(
                        {
                            title: 'Good Job',
                            icon: 'success',
                            text: 'Change Password Successful',
                            confirmButtonColor: "#188ae2",
                        }
                    ).then(() => {
                        window.location.reload()
                    })
                } else if (res.code === 400) {
                    Swal.fire(
                        {
                            title: 'Wrong Old Password !!',
                            icon: 'error',
                            confirmButtonColor: "#188ae2",
                        }
                    )
                }
            })
            .catch(() => {
                Swal.fire(
                    {
                        title: 'New Password and Confirm Password must match !!',
                        icon: 'error',
                        confirmButtonColor: "#188ae2",
                    }
                )
            })
    }
    handleAddBank(event, values) {
        // console.log(values);
        console.log(this.state.addBankImage);
        const image = this.state.addBankImage
        const dataAddBank = new FormData()
        dataAddBank.append('image', image)
        dataAddBank.append('account_name', values.account_name)
        dataAddBank.append('bank_name', values.bank_name)
        dataAddBank.append('branch', values.branch)
        dataAddBank.append('account_number', values.account_number)
        dataAddBank.append('swift_code', values.swift_code)
        dataAddBank.append('city', values.city)

        // for (const value of dataAddBank.entries()) {
        //     console.log("halo guyss", value);
        // }
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
            },
        }
        axios2.post('https://veeoffice.com/api/profile/add-bank', dataAddBank, config)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    Swal.fire(
                        {
                            title: 'Good Job',
                            icon: 'success',
                            text: 'Add bank Successful',
                            confirmButtonColor: "#188ae2",
                        }
                    ).then(() => {
                        this.setState({ modal_center: false })
                        window.location.reload()
                    })
                }
                console.log(res);
            })

    }
    handleCreatePin(event, values) {
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        post('/profile/change-pin', values, config)
            .then(res => {
                if (res.code === 200) {
                    Swal.fire(
                        {
                            title: 'Good Job',
                            icon: 'success',
                            text: 'Change Pin Successful',
                            confirmButtonColor: "#188ae2",
                        }
                    ).then(() => {
                        window.location.reload()
                    })
                } else if (res.code === 400) {
                    Swal.fire(
                        {
                            title: 'Wrong Old Pin !!',
                            icon: 'error',
                            confirmButtonColor: "#188ae2",
                        }
                    )
                }
            })
            .catch(() => {
                Swal.fire(
                    {
                        title: 'New Pin and Confirm Pin must match !!',
                        icon: 'error',
                        confirmButtonColor: "#188ae2",
                    }
                )
            })


    }
    async handleUpdateProfile(event, values) {
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const data = await post('/profile/update', values, config)

        if (data.code === 200) {
            this.setState({ updateProfile: true })
            Swal.fire(
                {
                    title: 'Good Job',
                    icon: 'success',
                    text: 'Update Profile Successful',
                    confirmButtonColor: "#188ae2",
                }
            ).then(this.setState({ updateProfile: false }))
        }
    }
    async componentDidMount() {
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const data = await get('/me', config)
        const user = data.user
        this.setState({ user })

        const dataBank = await get('/profile/get-banks', config)
        const bank = dataBank.data

        this.setState({ bank })

        if (this.state.updateProfile === true) {
            this.handleUpdateProfile()
        }

        const pin = await getData('/home')
        const checkPin = pin.data.accounts.pin
        this.setState({ checkPin })
    }

    handleImageAdd(e) {
        console.log(e.currentTarget.files[0]);
        this.setState({ addBankImage: e.currentTarget.files[0] })
    }
    render() {
        return (
            <React.Fragment>
                <div className='page-content font-barlow'>
                    <Container fluid>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md={3}>
                                            <Nav pills className="flex-column" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                <NavLink id="v-pills-home-tab" style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: this.state.customActiveTab === "1"
                                                    }, "mb-2")}
                                                    onClick={() => {
                                                        this.toggleCustom("1");
                                                    }} aria-controls="v-pills-home" aria-selected="true">
                                                    Profile Information
                                                </NavLink>
                                                <p className='px-3'>Update your account's profile information and email address</p>

                                                <NavLink id="v-pills-profile-tab" style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: this.state.customActiveTab === "2"
                                                    }, "mb-2")}
                                                    onClick={() => {
                                                        this.toggleCustom("2");
                                                    }} aria-controls="v-pills-home" aria-selected="true">
                                                    KYC Document
                                                </NavLink>
                                                <p className='px-3'>Update your account a document of individuals that can verify their identity and address</p>
                                                <NavLink id="v-pills-settings-tab" style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: this.state.customActiveTab === "3"
                                                    })}
                                                    onClick={() => {
                                                        this.toggleCustom("3");
                                                    }} aria-controls="v-pills-home" aria-selected="true">
                                                    Bank Account
                                                </NavLink>
                                                <p className='px-3'>Manage bank account to make deposit {'&'} withdrawal wallet</p>

                                                <NavLink id="v-pills-settings-tab" style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: this.state.customActiveTab === "4"
                                                    })}
                                                    onClick={() => {
                                                        this.toggleCustom("4");
                                                    }} aria-controls="v-pills-home" aria-selected="true">
                                                    Security
                                                </NavLink>
                                                <p className='px-3'>Add additional security to your account using two factor authentication</p>

                                                <NavLink href="/logout" id="v-pills-settings-tab" style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        this.toggleCustom("6");
                                                    }} aria-controls="v-pills-home" aria-selected="true">
                                                    Logout
                                                </NavLink>
                                            </Nav>
                                        </Col>
                                        <Col md={9}>
                                            <TabContent activeTab={this.state.customActiveTab} className="text-muted mt-4 mt-md-0" id="v-pills-tabContent">
                                                <TabPane tabId="1" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                    <AvForm onValidSubmit={this.handleUpdateProfile} >
                                                        <Row className='pt-2'>
                                                            <Col md={6}>
                                                                <Label htmlFor='email'>Email</Label>
                                                                <Input value={this.state.user.email || ''} placeholder='user@gmail.com' id='email' readOnly />
                                                                <br />
                                                                <Label htmlFor='fullname'>Fullname</Label>
                                                                <Input value={this.state.user.fullname || ''} placeholder='user' id='fullname' readOnly />
                                                                <br />
                                                                <Label htmlFor='province'>Province</Label>
                                                                <AvField name="province" value={this.state.user.province || ''} type="text" className="form-control" id="province" placeholder="Province" />

                                                            </Col>
                                                            <Col md={6}>
                                                                <Label htmlFor='username'>Username</Label>
                                                                <Input value={this.state.user.username || ''} placeholder='username' id='username' readOnly />
                                                                <br />
                                                                <Label htmlFor='phone'>Phone</Label>
                                                                <AvField name="phone" value={this.state.user.phone || ''} type="number" className="form-control" id="phone" placeholder="Phone" />
                                                                <br />
                                                                <Label htmlFor='city'>City</Label>
                                                                <AvField name="city" value={this.state.user.city || ''} type="text" className="form-control" id="city" placeholder="City" />
                                                            </Col>

                                                            <Col md={12}>
                                                                <br />
                                                                <Label htmlFor='address'>Address</Label>
                                                                <AvField value={this.state.user.address || ''} name="address" type="textarea" rows={4} className="form-control" id="address" placeholder="Address" />

                                                            </Col>
                                                            <Col md={12}>
                                                                <br />
                                                                <Button color='primary' className='text-uppercase' type='submit'>Submit</Button>
                                                            </Col>
                                                        </Row>
                                                    </AvForm>

                                                </TabPane>
                                                <TabPane tabId="2" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                    <FormWizard />
                                                </TabPane>
                                                <TabPane tabId="3" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                                    <div className="my-4 d-flex justify-content-between align-items-center">
                                                        <h6>Bank Account</h6>

                                                        <Button
                                                            type="button"
                                                            color="primary" className="waves-effect waves-light"
                                                            onClick={this.tog_center}
                                                        >
                                                            Add New Bank
                                                        </Button>
                                                    </div>
                                                    <TableBankAccount data={this.state.bank} />
                                                    <Modal
                                                        isOpen={this.state.modal_center}
                                                        toggle={this.tog_center}
                                                        centered={true}
                                                    >
                                                        <AvForm onValidSubmit={this.handleAddBank}>
                                                            <ModalHeader toggle={() => this.setState({ modal_center: false })}>
                                                                Add New Bank
                                                            </ModalHeader>
                                                            <ModalBody>
                                                                <Row>
                                                                    <Col xl={6}>
                                                                        <AvField
                                                                            value={this.state.current}
                                                                            name="account_name"
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="account_name"
                                                                            placeholder="Account Name"
                                                                            errorMessage="Enter Account Name"
                                                                            validate={{ required: { value: true } }}
                                                                        />
                                                                        <br />
                                                                        <AvField
                                                                            name="bank_name"
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="bank_name"
                                                                            placeholder="Bank Name"
                                                                            errorMessage="Enter Bank Name"
                                                                            validate={{ required: { value: true } }}
                                                                        />
                                                                        <br />
                                                                        <AvField
                                                                            name="branch"
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="branch"
                                                                            placeholder="Branch"
                                                                            errorMessage="Enter Branch"
                                                                            validate={{ required: { value: true } }}
                                                                        />
                                                                    </Col>
                                                                    <Col xl={6}>
                                                                        <AvField
                                                                            name="account_number"
                                                                            type="number"
                                                                            className="form-control"
                                                                            id="account_number"
                                                                            placeholder="Account Number"
                                                                            errorMessage="Enter Account Number"
                                                                            validate={{ required: { value: true } }}
                                                                        />
                                                                        <br />
                                                                        <AvField
                                                                            name="city"
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="vity"
                                                                            placeholder="City"
                                                                            errorMessage="Enter City"
                                                                            validate={{ required: { value: true } }}
                                                                        />
                                                                        <br />
                                                                        <AvField
                                                                            name="swift_code"
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="swift_code"
                                                                            placeholder="Swift Code"
                                                                            errorMessage="Enter Swift Code"
                                                                            validate={{ required: { value: true } }}
                                                                        />
                                                                    </Col>

                                                                </Row>
                                                                <Row>
                                                                    <Col xl={12}>
                                                                        <br />
                                                                        <h5 className='text-secondary'>Account Book Inbox</h5>
                                                                        <input type="file" className='form-control' onChange={this.handleImageAdd} />
                                                                    </Col>
                                                                </Row>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button
                                                                    type="button"
                                                                    onClick={this.tog_center}
                                                                    color="light"
                                                                    className="waves-effect"
                                                                >
                                                                    Close
                                                                </Button>
                                                                <Button
                                                                    type="submit"
                                                                    color="primary" className="waves-effect waves-light"
                                                                >
                                                                    Add Bank
                                                                </Button>
                                                            </ModalFooter>
                                                        </AvForm>
                                                    </Modal>

                                                </TabPane>
                                                <TabPane tabId="4" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                                    <Row>
                                                        <Col xl={6}>
                                                            <h5>Update Password</h5>
                                                            <p>Ensure your account using a long, random password to stay secure.</p>
                                                        </Col>
                                                        <Col xl={6}>
                                                            <AvForm onValidSubmit={this.handleChangePassword} >
                                                                <AvField
                                                                    name="current_password"
                                                                    value={this.state.current}
                                                                    type="password"
                                                                    className="form-control" id="current_password"
                                                                    placeholder="Current Password"
                                                                    errorMessage="Enter Current Password Min 8 Char"
                                                                    min={8}
                                                                    validate={{
                                                                        required: { value: true }, minLength: { value: 8 },
                                                                    }}
                                                                />
                                                                <br />
                                                                <AvField
                                                                    name="new_password"
                                                                    type="password"
                                                                    className="form-control"
                                                                    id="new_password"
                                                                    min={8}
                                                                    placeholder="New Password"
                                                                    errorMessage="Enter New Password Min 8 Char"
                                                                    validate={{
                                                                        required: { value: true }, minLength: { value: 8 },
                                                                    }}
                                                                />
                                                                <br />
                                                                <AvField
                                                                    name="new_confirm_password"
                                                                    type="password"
                                                                    className="form-control"
                                                                    id="new_confirm_password"
                                                                    placeholder="Confirm New Passwor"
                                                                    errorMessage="Enter Confirm New Password Min 8 Char"
                                                                    min={8}
                                                                    validate={{
                                                                        required: { value: true }, minLength: { value: 8 },
                                                                    }}
                                                                />
                                                                <br />
                                                                <Button type='submit' color='primary' >Submit</Button>
                                                            </AvForm>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <Row>
                                                        <Col xl={6}>
                                                            <h5>Pin Transaction</h5>
                                                            <p>Add additional security for your transaction using pin.</p>
                                                        </Col>
                                                        <Col xl={6}>
                                                            <AvForm onValidSubmit={this.handleCreatePin} >
                                                                {this.state.checkPin === null ?
                                                                    <h6>You Have not enabled pin transaction.</h6>
                                                                    :
                                                                    <div>
                                                                        <AvField
                                                                            name="current_pin"
                                                                            type="password"
                                                                            className="form-control"
                                                                            id="current_pin"
                                                                            placeholder="Current Pin"
                                                                            errorMessage="Enter Current Pin"
                                                                            validate={{ required: { value: true } }}
                                                                        />
                                                                        <br />
                                                                    </div>
                                                                }

                                                                <AvField
                                                                    name="pin"
                                                                    type="password"
                                                                    className="form-control"
                                                                    id="pin"
                                                                    placeholder="New Pin"
                                                                    errorMessage="Enter New Pin"
                                                                    validate={{ required: { value: true } }}
                                                                />
                                                                <br />
                                                                <AvField
                                                                    name="new_confirm_pin"
                                                                    type="password"
                                                                    className="form-control"
                                                                    id="new_confirm_pin"
                                                                    placeholder="Confirm New Pin"
                                                                    errorMessage="Enter Confirm New Pin"
                                                                    validate={{ required: { value: true } }}
                                                                />
                                                                <br />
                                                                <Button type='submit' color='primary' >Submit</Button>
                                                            </AvForm>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                            </TabContent>
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>
                        </Col>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}
