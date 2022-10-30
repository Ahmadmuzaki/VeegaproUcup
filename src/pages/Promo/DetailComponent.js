import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import { configApi } from '../../helpers/config';
import { Card, Col, Container, Row } from 'reactstrap';

const axios3 = axios.create()

const DetailComponent = () => {
  const [data, setData] = useState([])
  const { id } = useParams();
  const [book, setBook] = useState()

  useEffect(() => {
    axios3.get(`https://veeoffice.com/api/promo/detail/${id}`, configApi)
      .then(res => {
        setData(res.data.data)
      })
  }, [id])

  function handleSubmit() {
    axios3.post(`https://veeoffice.com/api/promo/book-now/${id}`,
      { book: book },
      configApi)
      .then(res => {
          alert(res.data.message)
          window.location.reload()
      })
  }
  return (
    <div className='page-content'>
      <Container>
        <Card className='p-3'>
          <Row>
            <Col xl={6} className="justify-items-center">
              <h5 className='text-center'>{data.promo_name}</h5>
              <Row>
                <center>
                  <Col xl={6}>
                    <img className='w-100' src={`https://veegapro.com/assets/promo-image/${data.image}`} alt="" />
                  </Col>
                </center>
              </Row>
            </Col>
            <Col xl={6}>
              <h6 className='my-5'>{data.description}</h6>
              <h6>Stock: {data.qty}</h6>
              <div className='d-flex'>
                <Row>
                  <Col md={7}>
                    <input type="number" className='form-control' onChange={(e) => {
                      setBook(e.target.value)
                    }} />
                  </Col>
                  <Col md={5}>
                    <button className='btn btn-primary' onClick={handleSubmit}>Book Now</button>
                  </Col>
                </Row>
              </div>
              <p className='text-muted py-1'>Max 2/Username</p>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  )
}

export default DetailComponent