import React, { Component } from 'react'
import { Button, Card, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, ModalFooter, Modal, ModalHeader, ModalBody } from 'reactstrap';
import classnames from "classnames";
import { Table } from './Table';
import { TableKedua } from './TableKedua';
import { get, post } from '../../helpers/api_helper';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import toastr from 'toastr'
import { numberWithCommas } from '../../utils/numberwithcomma';
import Swal from 'sweetalert2';
import axios from 'axios'

const axios2 = axios.create()

// import './style.css';

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectMenu: 0,
            addBankImage: '',
            dataPurchase: [],
            dataWithdraw: [],
            dataTableWithdraw: [],
            dataBankSelect: [],
            activeTab: "1",
            activeDescriptionTab: "purchase",
            product: {},
            breadcrumbItems: [
                { title: "Ecommerce", link: "#" },
                { title: "Product Detail", link: "#" },
            ],
        };
        // this.toggleTab = this.toggleTab.bind(this);
        this.toggledescription = this.toggledescription.bind(this);
        this.tog_center = this.tog_center.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleAddBank = this.handleAddBank.bind(this)
        this.handleImageAdd = this.handleImageAdd.bind(this)
        // this.imageShow = this.imageShow.bind(this);
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

    toggledescription(tab) {
        if (this.state.activeDescriptionTab !== tab) {
            this.setState({
                activeDescriptionTab: tab,
            });
        }
    }
    handleSelect(e) {
        const selectMenu = e.target.value
        this.setState({ selectMenu });
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
    handleImageAdd(e) {
        console.log(e.currentTarget.files[0]);
        this.setState({ addBankImage: e.currentTarget.files[0] })
    }

    async handleWithdraw(event, values) {
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const data = await post('/transaction/withdraw/store', values, config)

        if (data.code === 200) {
            alert('Withdraw Berhasil')
            // this.setState({ modal_center: false })

        } else {
            toastr.error(data.message)
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
        const data = await get('/transaction/purchase', config)
        const dataPurchase = data.data
        this.setState({ dataPurchase })
        console.log(this.state.dataPurchase);

        const dataKedua = await get('/transaction/withdraw', config)
        const dataWithdraw = dataKedua.minimum_withdraw
        const dataTableWithdraw = dataKedua.data_table
        this.setState({ dataWithdraw })
        this.setState({ dataTableWithdraw })

        console.log(this.state.dataTableWithdraw);

        const dataBank = await get('/profile/get-banks', config)
        const dataBankSelect = dataBank.data
        this.setState({ dataBankSelect })

    }
    render() {
        return (
            <React.Fragment>
                <div className='page-content font-barlow'>
                    <Container fluid>
                        <Card>
                            <div className="product-desc">
                                <Nav tabs className="nav-tabs-custom">
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    this.state.activeDescriptionTab ===
                                                    "purchase",
                                            })}
                                            onClick={() => {
                                                this.toggledescription("purchase");
                                            }}
                                        >
                                            Purchase
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active:
                                                    this.state.activeDescriptionTab ===
                                                    "withdrawal",
                                            })}
                                            onClick={() => {
                                                this.toggledescription("withdrawal");
                                            }}
                                        >
                                            Withdrawal
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent
                                    activeTab={this.state.activeDescriptionTab}
                                    className="border border-top-0 p-4"
                                >
                                    <TabPane tabId="purchase">

                                        <Table data={this.state.dataPurchase} />

                                    </TabPane>
                                    <TabPane tabId="withdrawal">
                                        <AvForm onValidSubmit={this.handleWithdraw}>
                                            <Row>
                                                <Col xl={4}>
                                                    <AvField name="amount" type="text" className="form-control" id="amount" placeholder="Amount" />
                                                    <span className='font-size-12 px-1'>Minimum Withdraw : Rp. {numberWithCommas(Number(this.state.dataWithdraw.minimum_withdraw))}</span>
                                                    <Row>
                                                        <Col>
                                                            <AvField type="select" name="bank">
                                                                {this.state.dataBankSelect.map((data, index) => (
                                                                    <option key={index} value={data.id}>{data.account_name}</option>
                                                                ))}
                                                            </AvField>
                                                        </Col>
                                                    </Row>
                                                    <p style={{ cursor: 'pointer' }} className='text-center text-md-end text-primary py-1 cursor-pointer' onClick={this.tog_center}>Add Bank</p>

                                                    <AvField name='note' type='textarea' rows='3' placeholder='Note' />
                                                    <Row className='my-2'>
                                                        <Col>
                                                            <Button type='submit' color='primary' className='waves-effect waves-light me-1 btn-block w-100'>Withdraw</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xl={8}>
                                                    <TableKedua data={this.state.dataTableWithdraw} />

                                                </Col>
                                            </Row>
                                        </AvForm>

                                    </TabPane>
                                </TabContent>
                            </div>
                        </Card>
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
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}
