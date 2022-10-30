import React, { Component } from 'react'
import { Card, Container } from 'reactstrap'
import { get } from '../../helpers/api_helper'
import { configApi } from '../../helpers/config'
import PromoCarousel from './PromoCarousel'
import { TablePromo } from './TablePromo'

export default class index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataTablePromo: []
    }
  }
  async componentDidMount() {
    const data = await get('/promo/table', configApi)
    if (data.code === 200) {
      this.setState({ dataTablePromo: data.data })
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className='page-content font-barlow'>
          <Container fluid>
            <PromoCarousel />
            <Card className='p-4'>
              <TablePromo data={this.state.dataTablePromo} id={this.state.dataTablePromo.id} />
            </Card>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}
