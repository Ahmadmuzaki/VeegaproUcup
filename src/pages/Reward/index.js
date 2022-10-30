import React, { Component } from 'react'
import { Card, Col, Container } from 'reactstrap'
import reward from '../../assets/images/vector/reward.jpg';
import { get } from '../../helpers/api_helper';
import { TableReward } from './TableReward';

export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFile: null,
            dataTableReward: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    }

    fileSelectedHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }
    async handleSubmit(event, values) {
        let fd = new FormData()
        fd.append('note', values.note)
        fd.append('images', this.state.selectedFile)
        fd.append('amount', values.amount)

        // const baru = Object.assign(values, {images: this.state.selectedFile})

        // for (const value of fd.entries()) {
        //     console.log("halo guyss", value);
        // }

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer' + localStorage.getItem('token'),
        //         'content-type': 'multipart/form-data'
        //     },
        // }

        // const data = await axios2.post('https://veeoffice.com/api/deposit', fd, config)

        // console.log(data);

    }

    async componentDidMount() {
        const getConfig = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json'
            },
        }
        const dataTableReward = await get('/reward-table', getConfig)

        this.setState({ dataTableReward })

        const reward = await get('/reward', getConfig)
        console.log(reward.code);

    }

    

    render() {
        return (
            <React.Fragment>
                <div className='page-content font-barlow'>
                    <Container fluid>
                        {/* <TableTree/> */}
                        {/* <Card>
                            <AvForm onValidSubmit={this.handleSubmit}>
                                <AvField type='number' placeholder='Amount' name='amount' />
                                <AvField type='text' placeholder='Note' name='note' />
                                <Input type="file" onChange={this.fileSelectedHandler} accept="image/*" />
                                <Button type='submit' >Submit</Button>
                            </AvForm>
                        </Card> */}
                        <Card className='p-4'>
                            <div className='row justify-content-center'>
                                <Col xl={7}>
                                    <center>
                                        <h4>Not Avaiable Reward</h4>
                                        <img src={reward} alt="" className='w-50' />
                                        <p>Share your referral to direct people to join us and earning now !</p>
                                    </center>
                                </Col>

                            </div>
                        </Card>
                        <Card className='p-4'>
                            <div className='row'>
                                <Col xl={12}>
                                    <TableReward data={this.state.dataTableReward} />
                                </Col>
                            </div>
                        </Card>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}


