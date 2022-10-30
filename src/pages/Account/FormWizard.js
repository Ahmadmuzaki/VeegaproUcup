import React, { Component } from "react";
import { Row, Col, Card, CardBody, TabContent, TabPane, NavItem, NavLink, Input, Progress, Container } from "reactstrap";

import classnames from 'classnames';
import { Link } from "react-router-dom";

import selfie from '../../assets/images/vector/crc.png'
import ktp from '../../assets/images/vector/crc2.png'
import Axios from "axios";
import Swal from "sweetalert2";
import { getData } from "../../helpers/api_helper";
import waiting from '../../assets/images/vector/waiting.jpg'
import completed from '../../assets/images/vector/completed.jpg'

const axios2 = Axios.create()

class FormWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            activeTabProgress: 1,
            progressValue: 25,
            ktp: '',
            selfie: '',
            npwp: '',
            kycStatus: ''
        };
        this.toggleTab.bind(this);
        this.toggleTabProgress.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handlektp = this.handlektp.bind(this)
        this.handleSelfie = this.handleSelfie.bind(this)
        this.handleNpwp = this.handleNpwp.bind(this)
    }


    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            if (tab >= 1 && tab <= 4) {
                this.setState({
                    activeTab: tab
                });
            }
        }
    }

    toggleTabProgress(tab) {
        if (this.state.activeTabProgress !== tab) {
            if (tab >= 1 && tab <= 4) {
                this.setState({
                    activeTabProgress: tab
                });

                if (tab === 1) { this.setState({ progressValue: 25 }) }
                if (tab === 2) { this.setState({ progressValue: 50 }) }
                if (tab === 3) { this.setState({ progressValue: 75 }) }
                if (tab === 4) { this.setState({ progressValue: 100 }) }
            }
        }
    }

    handlektp(e) {
        this.setState({ ktp: e.target.files[0] })
    }
    handleSelfie(e) {
        this.setState({ selfie: e.target.files[0] })
    }
    handleNpwp(e) {
        this.setState({ npwp: e.target.files[0] })
    }

    handleConfirm() {
        const ktp = this.state.ktp
        const selfie = this.state.selfie
        const npwp = this.state.npwp

        const upload = new FormData()
        upload.append('files_ktp', ktp)
        upload.append('files_selfie', selfie)
        upload.append('files_npwp', npwp)

        // for (const value of upload.entries()) {
        //         console.log("halo guyss", value);
        //     }

        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
            },
        }
        axios2.post('https://veeoffice.com/api/kyc-docs', upload, config)
            .then(res => {
                if (res && res.data.code === 200) {
                    Swal.fire(
                        {
                            title: 'Good Job',
                            icon: 'success',
                            text: 'Upload Successful',
                            confirmButtonColor: "#188ae2",
                        }
                    ).then(res => {
                        window.location.reload()
                    })
                } else {
                    Swal.fire(
                        {
                            title: 'Warning',
                            icon: 'warning',
                            text: 'Upload Failed. Try Again !!!',
                            confirmButtonColor: "#188ae2",
                        }
                    )
                }
            }).catch(err => {
                alert(err.message)
            })
    }
    async componentDidMount() {
        const data = await getData('/kyc-checker')
        const kycStatus = data.data.message
        this.setState({ kycStatus })
    }

    render() {
        const { kycStatus } = this.state
        return (
            <React.Fragment>
                <div>
                    <Container fluid={true}>
                        <Row>
                            <Col lg="12">
                                <Card>
                                    {kycStatus === 'pending' ?
                                        <div>
                                            <Row className="p-4">
                                                <center>
                                                    <Col>
                                                        <h6>Please wait ... </h6>
                                                        <h6>Your document is under review </h6>
                                                        <img src={waiting} alt="" className="w-50" />
                                                    </Col>
                                                </center>
                                            </Row>
                                        </div>
                                        : kycStatus === true ?
                                            <div>
                                                <Row className="p-4">
                                                    <center>
                                                        <Col>
                                                            <h6>Congratulation </h6>
                                                            <h6>Your document has been verified </h6>
                                                            <img src={completed} alt="" className="w-50" />
                                                        </Col>
                                                    </center>
                                                </Row>
                                            </div>
                                            :
                                            <CardBody>
                                                <h4 className="card-title mb-4">KYC Document</h4>

                                                <div id="progrss-wizard" className="twitter-bs-wizard">
                                                    <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                                                        <NavItem>
                                                            <NavLink className={classnames({ active: this.state.activeTabProgress === 1 })} onClick={() => { this.toggleTabProgress(1); }} >
                                                                <span className="step-number">01</span>
                                                                <span className="step-title">Upload KTP</span>
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink className={classnames({ active: this.state.activeTabProgress === 2 })} onClick={() => { this.toggleTabProgress(2); }} >
                                                                <span className="step-number">02</span>
                                                                <span className="step-title">Upload selfie with KTP</span>
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink className={classnames({ active: this.state.activeTabProgress === 3 })} onClick={() => { this.toggleTabProgress(3); }} >
                                                                <span className="step-number">03</span>
                                                                <span className="step-title">Upload NPWP</span>
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink className={classnames({ active: this.state.activeTabProgress === 4 })} onClick={() => { this.toggleTabProgress(4); }} >
                                                                <span className="step-number">04</span>
                                                                <span className="step-title">Finish</span>
                                                            </NavLink>
                                                        </NavItem>
                                                    </ul>

                                                    <div id="bar" className="mt-4">
                                                        <Progress color="success" striped animated value={this.state.progressValue} />
                                                    </div>
                                                    <TabContent activeTab={this.state.activeTabProgress} className="twitter-bs-wizard-tab-content">
                                                        <TabPane tabId={1}>
                                                            <div className="row justify-content-center">
                                                                <Col lg={9}>
                                                                    <p className="text-center">Please take your document so that it's clearly and visible</p>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Input type="file" className="form-control" onChange={this.handlektp} />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <center>
                                                                        <img src={ktp} alt="ktp" className="w-50" />
                                                                    </center>
                                                                </Col>
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tabId={2}>
                                                            <div className="row justify-content-center">
                                                                <Col lg={9}>
                                                                    <p className="text-center">Please take your document with your face so that it's clearly and visible</p>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Input type="file" className="form-control" onChange={this.handleSelfie} />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <center>
                                                                        <img src={selfie} alt="selfie" className="w-50" />
                                                                    </center>
                                                                </Col>
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tabId={3}>
                                                            <div className="row justify-content-center">
                                                                <Col lg={9}>
                                                                    <p className="text-center">Upload your NPWP</p>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Input type="file" className="form-control" onChange={this.handleNpwp} />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <center>
                                                                        <img src={selfie} alt="npwp" className="w-50" />
                                                                    </center>
                                                                </Col>
                                                            </div>
                                                        </TabPane>
                                                        <TabPane tabId={4}>
                                                            <div className="row justify-content-center">
                                                                <Col lg="6">
                                                                    <div className="text-center">
                                                                        <div className="mb-4">
                                                                            <i className="mdi mdi-check-circle-outline text-success display-4"></i>
                                                                        </div>
                                                                        <div>
                                                                            <h5>Confirm Detail</h5>
                                                                            <p className="text-muted">Check before you confirmate</p>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </div>
                                                        </TabPane>
                                                    </TabContent>
                                                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                                                        <li className={this.state.activeTabProgress === 1 ? "previous disabled" : "previous"}><Link to="#" onClick={() => { this.toggleTabProgress(this.state.activeTabProgress - 1); }}>Previous</Link></li>
                                                        <li className="next"><Link to="#" onClick={() => {
                                                            this.state.activeTabProgress === 4 ?
                                                                this.handleConfirm() :
                                                                this.toggleTabProgress(this.state.activeTabProgress + 1);
                                                        }}
                                                        >{this.state.activeTabProgress === 4 ? 'Confirm' : 'Next'}</Link></li>
                                                    </ul>
                                                </div>
                                            </CardBody>
                                    }
                                </Card>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </React.Fragment >
        );
    }
}

export default FormWizard;
