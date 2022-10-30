import React, { Component } from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

import refer from '../../assets/images/vector/refer.png';
import { get } from '../../helpers/api_helper';
import { configApi } from '../../helpers/config';
import { numberWithCommas } from '../../utils/numberwithcomma';
import TabsReferral from './TabsReferral';
import toastr from 'toastr'

export default class Referral extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataReferral: '',
            user: '',
            userCopy: ''
        }
        this.handleCopy = this.handleCopy.bind(this)
    }

    async componentDidMount() {
        try {
            const data = await get('/data-direct', configApi)
            this.setState({ dataReferral: data })
            console.log(data);

            const userData = await get('/me', configApi)
            const user = userData.user.username;
            this.setState({ user })
            this.setState({ userCopy: `https://veeoffice.com/register/${user}` })
        } catch (error) {

        }


    }
    handleCopy() {
        navigator.clipboard.writeText(this.state.userCopy)
        toastr.success("Copied " + this.state.userCopy)
    }
    render() {
        return (
            <div className='page-content'>
                <Container fluid>
                    <Card className='p-4'>
                        <Row>
                            <Col xl={3}>
                                <Card style={{ height: '8rem' }}>
                                    <CardBody>
                                        <h6 className='text-center'>Total Direct Referral</h6>
                                        <p className='text-center py-1'>{this.state.dataReferral.total_direct_referral}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={3}>
                                <Card style={{ height: '8rem' }}>
                                    <CardBody>
                                        <h6 className='text-center'>Total Omset Direct Referral (IDR)</h6>
                                        <p className='text-center py-1'>Rp. {numberWithCommas(Number(this.state.dataReferral.total_omset_direct_referral))}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={3}>
                                <Card style={{ height: '8rem' }}>
                                    <CardBody>
                                        <h6 className='text-center'>Total Group</h6>
                                        <p className='text-center py-1 mb-2'>{this.state.dataReferral.total_group}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={3}>
                                <Card style={{ height: '8rem' }}>
                                    <CardBody>
                                        <h6 className='text-center'>Total Omset Group (IDR)</h6>
                                        <p className='text-center py-1'>{this.state.dataReferral.total_omset_group}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={6} className="d-flex justify-content-center">
                                <img src={refer} alt="" className='w-75' />
                            </Col>
                            <Col xl={6}>
                                <h6>Refer a friend</h6>
                                <p>Share your referal link and start earning</p>
                                <Row>
                                    <Col xl={7}>
                                        <input type="text" className='form-control' disabled value={`https://veeoffice.com/register/${this.state.user}` || ''} />
                                    </Col>
                                    <Col xl={5}>
                                        <button className='btn btn-primary text-uppercase' onClick={this.handleCopy}>copy link</button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TabsReferral />
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        )
    }
}
