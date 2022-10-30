// import axios from "axios";
import React, { Component } from "react";
import { Container, NavLink, Row, Col, Card, Modal, ModalHeader, ModalBody, TabPane, TabContent, NavItem, Nav, Input, ModalFooter, Button } from "reactstrap";
import { get, post } from "../../helpers/api_helper";
import classnames from "classnames";
import './style.css'
import { configApi } from "../../helpers/config";
import axios from 'axios'
import Swal from 'sweetalert2';
import { AvField, AvForm } from "availity-reactstrap-validation";

const axios2 = axios.create()

class Dashboard extends Component {

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    constructor(props) {
        super(props)

        this.state = {
            data_menu: [],
            list_package: [],
            package_active: [],
            rank: [],
            data_modal: '',
            modal_active: false,
            activeTabJustify: "5",
            activeTab1: "5",
            dataBankSelect: [],
            extract_data_bank: [],
            inputVoucher: '',
            tranferImage: '',
            updateDOM: '',
            package_request: ''

        }
        this.handleToggle = this.handleToggle.bind(this)
        this.toggleCustomJustified = this.toggleCustomJustified.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.handleOnchangeVoucher = this.handleOnchangeVoucher.bind(this)
        this.handlePurchaseVoucher = this.handlePurchaseVoucher.bind(this)
        this.handleOnChangeImage = this.handleOnChangeImage.bind(this)
        this.handleSubmitTransferBank = this.handleSubmitTransferBank.bind(this)
        this.handleUpgradeText = this.handleUpgradeText.bind(this)
        this.handleAddBank = this.handleAddBank.bind(this)
        this.handleImageAdd = this.handleImageAdd.bind(this)
        this.tog_center = this.tog_center.bind(this);


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


    async handleClick(e) {
        const indomie = await e
        this.setState({ data_modal: indomie })
        this.setState({ modal_active: true })
    }

    handleToggle() {
        // const currentState = this.state.modal_active
        this.setState({ modal_active: !this.state.modal_active })
    }
    toggleCustomJustified(tab) {
        if (this.state.activeTabJustify !== tab) {
            this.setState({
                activeTabJustify: tab
            });
        }
    }
    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }
    handleOption(e) {
        // console.log(this.state.dataBankSelect);

        this.state.dataBankSelect.map(data => (
            data.account_name === e.target.value ?
                this.setState({ extract_data_bank: data }) :
                null
        ))

    }
    handleOnchangeVoucher(e) {
        this.setState({
            inputVoucher: {
                ...this.state.inputVoucher,
                [e.target.name]: e.target.value
            }
        });
    }
    async handlePurchaseVoucher(e) {
        e.preventDefault()
        const voucher = this.state.inputVoucher
        Object.assign(voucher, { 'package_id': this.state.data_modal.id })

        post('/purchase/package/voucher', voucher, configApi)
            .then(res => {
                if (res.code === 400) {
                    alert(res.message)
                    return
                }
                alert(res.message)
                window.location.reload()
                this.setState({ modal_active: false })

            })

    }
    async handleOnChangeImage(e) {
        const dataImage = await e.target.files[0]
        this.setState({ tranferImage: dataImage })
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

    async handleSubmitTransferBank(e) {
        e.preventDefault()
        const bankAccount = await this.state.extract_data_bank.id
        const packageID = await this.state.data_modal.id
        const image = await this.state.tranferImage
        const dataBankTransfer = new FormData()
        dataBankTransfer.append('bank_account', bankAccount)
        dataBankTransfer.append('package_id', packageID)
        dataBankTransfer.append('image', image)

        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
            },
        }

        // for (const value of dataBankTransfer.entries()) {
        //     console.log("halo guyss", value);
        // }

        axios2.post('https://veeoffice.com/api/purchase/package/transfer', dataBankTransfer, config)
            .then(res => {
                Swal.fire(
                    {
                        title: 'Good Job',
                        icon: 'success',
                        text: res.data.message,
                        confirmButtonColor: "#188ae2",
                    }
                ).then(() => {
                    this.setState({ modal_active: false })
                    window.location.reload()
                })

            }).catch(err => alert("The given data was invalid."))
    }

    async componentDidMount() {
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const data = await get('/home', config)
        try {
            const list_package = data.list_package
            const package_active = data.package_active
            const rank = data.data_menu.rank;
            const data_menu = data.data_menu
            const package_request = data.package_request
            this.setState({ rank })
            this.setState({ list_package })
            this.setState({ package_active })
            this.setState({ data_menu })
            this.setState({ package_request })


            const dataBank = await get('/profile/get-banks', config)
            const dataBankSelect = dataBank.data
            this.setState({ dataBankSelect })

        } catch (error) {
            console.log(error);
            window.location.reload()
        }


    }
    handleUpgradeText(id) {
        let pack_id = ''
        if (this.state.package_request !== null) {
            pack_id = this.state.package_request.package_id
            // console.log(pack_id);
        }
        if (this.state.package_request !== null && pack_id === id) {
            return "Waiting Approval"
        } else if (this.state.list_package.length < 5) {
            return "Upgrade"
        } else {
            return "Purchase Now"
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="page-content font-barlow">
                    <Container fluid>
                        <Row className="mb-4">

                            <Col xl={3} className="py-2">
                                <Card className="p-4 h-100">
                                    <Row className="align-items-center font-barlow">
                                        <Col xl={4} className="d-flex justify-content-center p-3">
                                            <button className="mdi mdi-gift font-size-24 px-2 text-white btn p-0 " style={{ backgroundColor: '#0575e6' }}></button>
                                        </Col>
                                        <Col xl={8}>
                                            <h6 className="text-secondary m-auto my-2">Total Bonus (IDR)</h6>
                                            <h6>Rp. {this.numberWithCommas(parseInt(this.state.data_menu.total_bonus))}</h6>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xl={3} className="py-2">
                                <Card className="p-4 h-100">
                                    <Row className="align-items-center">
                                        <Col xl={4} className="d-flex justify-content-center p-3">
                                            <button className="ri-download-2-fill font-size-24 px-2 text-white btn p-0 " style={{ backgroundColor: '#0575e6' }}></button>
                                        </Col>
                                        <Col xl={8}>
                                            <h6 className="text-secondary m-auto my-2">Total Withdraw (IDR)</h6>
                                            <h6>Rp. {this.numberWithCommas(parseInt(this.state.data_menu.total_withdraw))}</h6>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xl={3} className="py-2">
                                <Card className="p-4 h-100">
                                    <Row className="align-items-center">
                                        <Col xl={4} className="d-flex justify-content-center p-3">
                                            <button className="ri-shopping-cart-fill font-size-24 px-2 text-white btn p-0 " style={{ backgroundColor: '#0575e6' }}></button>
                                        </Col>
                                        <Col xl={8}>
                                            <h6 className="text-secondary m-auto my-2">Total Purchase (IDR)</h6>
                                            <h6>Rp. {this.numberWithCommas(parseInt(this.state.data_menu.total_purchase))}</h6>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col xl={3} className="py-2">
                                <Card className="p-4 h-100">
                                    <Row className="align-items-center">
                                        <Col xl={4} className="d-flex justify-content-center p-3">
                                            <button className="ri-trophy-fill font-size-24 px-2 text-white btn p-0 " style={{ backgroundColor: '#0575e6' }}></button>
                                        </Col>
                                        <Col xl={8}>
                                            <h6 className="text-secondary my-2">Rank</h6>
                                            <h6>{this.state.rank === null ? "No-rank" : this.state.rank.name}</h6>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                        <Row>
                            {this.state.package_active === null ?
                                null :
                                <Col xl={3}>
                                    <Card className=" platinum text-center shadow-md py-4">
                                        <div className="p-4">
                                            <h4 className="text-white  font-contrax">{this.state.package_active.name}</h4>
                                            <h5 className="text-white  font-contrax py-3">{this.numberWithCommas(Number(this.state.package_active.amount))}</h5>
                                            <p>Total Produk Senilai Rp. {this.numberWithCommas(Number(this.state.package_active.amount))},-</p>
                                            <p>200-17-21-59</p>
                                        </div>
                                        <span className="text-white border bg-success" >Running...</span>
                                    </Card>
                                </Col>
                            }
                            {
                                this.state.list_package && this.state.list_package.map((data, index) => (
                                    <Col xl={3} key={index}>
                                        <Card className=" platinum text-center shadow-md py-4">
                                            <div className="p-4">
                                                <h4 className="text-white  font-contrax">{data.name}</h4>
                                                <h5 className="text-white  font-contrax py-3">{this.numberWithCommas(data.amount - Number(this.state.package_active === null ? 0 : this.state.package_active.amount))}</h5>
                                                <p>Total Produk Senilai Rp. {this.numberWithCommas(data.amount)},-</p>
                                                <p>200-17-21-59</p>
                                            </div>
                                            <button className="text-white border" disabled={this.state.package_request === null ? false : true} style={this.state.package_request === null ? { backgroundColor: '#188ae2' } : { backgroundColor: '#df7a21', cursor: 'not-allowed' }} onClick={() => {
                                                this.handleClick(data)
                                            }}>{this.handleUpgradeText(data.id)}</button>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                        <Modal
                            centered
                            isOpen={this.state.modal_active}
                            toggle={this.handleToggle}
                            className='modal-lg'
                        >
                            <ModalHeader toggle={this.handleToggle}>
                                <span>Purchase</span>
                            </ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col xl={4}>
                                        <Card className=" platinum text-center shadow-md py-4">
                                            <div className="p-4 text-white">
                                                <h4 className=" font-contrax">{this.state.data_modal.name}</h4>
                                                <h4 className="text-white my-5">{this.numberWithCommas(Number(this.state.data_modal.amount))},-</h4>
                                                <p>Total Produk Senilai <br /> Rp. {this.numberWithCommas(Number(this.state.data_modal.amount))},-</p>
                                                <p>200-17-21-59</p>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col xl={8}>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: this.state.activeTab1 === "5"
                                                    })}
                                                    onClick={() => {
                                                        this.toggle1("5");
                                                    }}
                                                >
                                                    Voucher
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({
                                                        active: this.state.activeTab1 === "6"
                                                    })}
                                                    onClick={() => {
                                                        this.toggle1("6");
                                                    }}
                                                >
                                                    Bank Transfer
                                                </NavLink>
                                            </NavItem>
                                        </Nav>

                                        <TabContent activeTab={this.state.activeTab1}>
                                            <TabPane tabId="5">
                                                <Row>
                                                    <Col sm="12">
                                                        <label className="w-100 pt-3 pb-1"> Voucher Code
                                                            <Input type="text" name="voucher_code" onChange={this.handleOnchangeVoucher} />
                                                        </label>
                                                        <label className="w-100 py-1"> Pin Transaction
                                                            <Input type="password" name="pin" onChange={this.handleOnchangeVoucher} />
                                                        </label>
                                                        <button className="btn btn-primary btn-block w-100" onClick={this.handlePurchaseVoucher}>Purchase</button>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="6">
                                                <Row>
                                                    <Col sm="12" className="pt-3">
                                                        <form onSubmit={this.handleSubmitTransferBank}>
                                                            <label className="w-100"> Bank Account
                                                                <select className="form-select" onChange={this.handleOption}>
                                                                    <option selected="selected" disabled>Please Select Bank</option>
                                                                    {this.state.dataBankSelect.map((data, index) => (
                                                                        <option key={index}>{data.account_name}</option>
                                                                    ))}
                                                                </select>
                                                            </label>
                                                            {this.state.extract_data_bank.length === 0 ?
                                                                null :
                                                                <Row className="px-3 py-1">
                                                                    <Col sm={12}>
                                                                        <span>Account Name :{this.state.extract_data_bank.account_name} </span>
                                                                    </Col>
                                                                    <Col sm={12}>
                                                                        <span>Account Number : {this.state.extract_data_bank.account_number} </span>
                                                                    </Col>
                                                                    <Col sm={12}>
                                                                        <span>Bank Name : {this.state.extract_data_bank.bank_name} </span>
                                                                    </Col>
                                                                    <Col sm={12}>
                                                                        <span>City : {this.state.extract_data_bank.city} </span>
                                                                    </Col>
                                                                    <Col sm={12}>
                                                                        <span>Branch : {this.state.extract_data_bank.branch} </span>
                                                                    </Col>
                                                                </Row>
                                                            }
                                                            <p style={{ cursor: 'pointer' }} className='text-center text-md-end text-primary py-1 cursor-pointer' onClick={this.tog_center}>Add Bank</p>

                                                            <label> Image
                                                                <input type="file" className="form-control" onChange={this.handleOnChangeImage} />
                                                            </label>
                                                            <label className="w-100">Note
                                                                <textarea name="note" rows="5" className="form-control"></textarea>
                                                            </label>
                                                            <button type="submit" className="btn btn-primary btn-block w-100">Purchase Package</button>
                                                        </form>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </Col>
                                </Row>
                                {/* {this.state.data_modal.name} */}
                            </ModalBody>
                        </Modal>
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
        );
    }
}

export default Dashboard;
