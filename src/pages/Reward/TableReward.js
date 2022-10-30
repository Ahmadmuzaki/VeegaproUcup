import React, { useEffect, useRef, useState } from "react"
import $ from 'jquery'
import { Modal, Row, Col } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import moment from "moment"

export function TableReward(props) {

    const [data, setData] = useState('')
    const [showModal, setShowModal] = useState(false)
    const toggle = () => setShowModal(!showModal);

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "tableleveling"

    useEffect(() => {
        const table = $(`#${tableName}`).DataTable({
            data: props.data,
            columns: [
                {
                    title: "Date/Time", data: "datetime",
                    render: function (data, type, row) {
                        return moment(data).format('YYYY-MM-DD HH:mm:ss')
                    }
                },
                { title: "Reward", data: "reward" },
                { title: "Min Line", data: "minline" },
                { title: "Amount/Line", data: "amountline" },
                { title: "Status", data: "Status" },
                {
                    title: "Action",
                    data: null,
                    render: function (data, type, row) {
                        return '<button data-act="upd">Update</button> <br> <button data-act="del" >Delete</button>'
                    }
                },
            ],
        })
        $(`#${tableName} tbody`).on('click', 'button', async function () {
            const action = $(this).data().act
            const data = table.row($(this).parents('tr')).data()
            if (action === "upd") {
                alert("Update bos!" + data.id)
                setData(data)
                setShowModal(true)
            }
            else if (action === "del") {
                alert("Delete bos! " + data.id)
            }
        })
        return function () {
            table.destroy()
        }
    }, [props.data])
    return (
        <div>
            <Modal
                isOpen={showModal}
                toggle={toggle}
                className='modal-dialog-centered modal-sm'
            >
                <Row>
                    <Col>
                        <AvForm>
                            <AvField value={data && data.datetime} name='datetime' type='text' className='form-control' />
                        </AvForm>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AvForm>
                            <AvField value={data && data.reward} name='reward' type='text' className='form-control' />
                        </AvForm>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AvForm>
                            <AvField value={data && data.minline} name='minline' type='text' className='form-control' />
                        </AvForm>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AvForm>
                            <AvField value={data && data.amountline} name='amountline' type='text' className='form-control' />
                        </AvForm>
                    </Col>
                </Row>
            </Modal>
            <Modal
                isOpen={showModal}
                toggle={toggle}
                className='modal-dialog-centered modal-sm'
            >
                <Row>
                    <Col>
                        <AvForm>
                            <AvField value={data && data.datetime} name='datetime' type='text' className='form-control' />
                        </AvForm>
                    </Col>
                </Row>
            </Modal>
            <table className="display" width="100%" id={tableName} ref={tableRef}></table>
        </div>

    )
}