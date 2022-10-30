import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Bonus from './Bonus'

export default class index extends Component {
  render() {
    return (
      <div className='page-content font-barlow'>
        <Container fluid>
          <Bonus/>
        </Container>
      </div>
    )
  }
}
