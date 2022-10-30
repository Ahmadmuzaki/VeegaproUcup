import React, { useState, useEffect, useRef } from "react"
import $ from 'jquery'
import { Modal, Row, Col, Label, ModalBody, ModalFooter, Button } from 'reactstrap'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { post } from "../../helpers/api_helper"
import Swal from 'sweetalert2';

export function TableBankAccount(props) {

    const [dataBank, setDataBank] = useState([])
    const [showModal, setShowModal] = useState(false)
    const toggle = () => setShowModal(!showModal);
    const [showModalDelete, setShowModalDelete] = useState(false)
    const toggleDelete = () => setShowModalDelete(!showModalDelete);
    const [idBank, setIdBank] = useState(0)

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    const tableName = "tablebankaccount"

    useEffect(() => {
        const table = $(`#${tableName}`).DataTable(
            {
                data: props.data,
                columns: [
                    { title: "Account Name", data: "account_name" },
                    {
                        title: "Image", data: "image_bank",
                        render: function (data, type, row) {
                            return `<a href="https://veeoffice.com/assets/images//${data}">
                            <img class="w-75" src="https://veeoffice.com/assets/images/${data}" alt="" /></a>`

                        }
                    },
                    { title: "Account Number", data: "account_number" },
                    { title: "Bank Name", data: "bank_name" },
                    { title: "City", data: "city" },
                    { title: "Branch", data: "branch" },
                    { title: "Swift Code", data: "swift_code" },
                    {
                        title: "Action",
                        data: null,
                        render: function (data, type, row) {
                            return '<button class="btn btn-primary btn-sm rounded my-1" data-act="upd">Update</button> <br> <button class="btn-danger btn btn-sm rounded" data-act="del" >Delete</button>'
                        }
                    },

                ],
                destroy: true,  // I think some clean up is happening here
                searching: true,
                responsive: true,
            }
        )

        $(`#${tableName} tbody`).on('click', 'button', async function () {
            const action = $(this).data().act
            const data = await table.row($(this).parents('tr')).data()

            try {
                if (action === "upd") {
                    // alert("Update bos!" + data.id)
                    setDataBank(data)
                    setShowModal(true)
                }
                else if (action === "del") {
                    // alert("Delete bos! " + data.id)
                    setIdBank(data.id)
                    setShowModalDelete(true)
                }
            } catch (error) {

            }

        })
        // Extra step to do extra clean-up.
        return function () {

            table.destroy()
        }
    }, [props.data])

    async function handleUpdate(event, values) {
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const dataUpdate = await post('/profile/update-bank', values, config)

        if (dataUpdate.code === 200) {
            setShowModal(false)
            Swal.fire(
                {
                    title: 'Good Job',
                    icon: 'success',
                    text: 'Update Successful',
                    confirmButtonColor: "#188ae2",
                }
            ).then(res => {
                window.location.reload()
            })
        }
    }
    async function handleDelete(event, values) {
        console.log(values);
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const dataUpdate = await post('/profile/delete-bank', values, config)

        if (dataUpdate.code === 200) {
            setShowModalDelete(false)
            Swal.fire(
                {
                    title: 'Good Job',
                    icon: 'success',
                    text: 'Delete Successful',
                    confirmButtonColor: "#188ae2",
                }
            ).then(res => {
                window.location.reload()
            })
        }
    }
    return (
        <div>
            <Modal
                isOpen={showModal}
                toggle={toggle}
                className='modal-dialog-centered modal-md'
            >
                <Row>
                    <Col>
                        <AvForm onValidSubmit={handleUpdate}>
                            <ModalBody>
                                <AvField id="ade" value={dataBank && dataBank.id} name='id_bank' type='text' className='form-control' hidden />
                                <Label htmlFor='account_name'>Account Name</Label>
                                <AvField id="account_name" value={dataBank && dataBank.account_name} name='account_name' type='text' className='form-control' />
                                <Label htmlFor='account_number'>Account Number</Label>
                                <AvField id="account_number" value={dataBank && dataBank.account_number} name='account_number' type='text' className='form-control' />
                                <Label htmlFor='bank_name'>Bank Name</Label>
                                <AvField id="bank_name" value={dataBank && dataBank.bank_name} name='bank_name' type='text' className='form-control' />
                                <Label htmlFor='city'>City</Label>
                                <AvField id="city" value={dataBank && dataBank.city} name='city' type='text' className='form-control' />
                                <Label htmlFor='branch'>Branch</Label>
                                <AvField id="branch" value={dataBank && dataBank.branch} name='branch' type='text' className='form-control' />
                                <Label htmlFor='swift_code'>Swift Code</Label>
                                <AvField id="swift_code" value={dataBank && dataBank.swift_code} name='swift_code' type='text' className='form-control' />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    onClick={toggle}
                                    color="light"
                                    className="waves-effect"
                                >
                                    Close
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary" className="waves-effect waves-light"
                                >
                                    Update Bank
                                </Button>
                            </ModalFooter>
                        </AvForm>
                    </Col>
                </Row>

            </Modal>
            <Modal
                isOpen={showModalDelete}
                toggle={toggleDelete}
                className='modal-dialog-centered modal-md'
            >
                <Row>
                    <Col>
                        <AvForm onValidSubmit={handleDelete}>
                            <ModalBody>
                                <p>Are you sure want delete this bank?</p>
                                <AvField value={idBank} name='bank_id' type='text' className='form-control' hidden />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    onClick={toggleDelete}
                                    color="light"
                                    className="waves-effect"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary" className="waves-effect waves-light"
                                >
                                    Yes
                                </Button>
                            </ModalFooter>
                        </AvForm>
                    </Col>
                </Row>

            </Modal>
            <table className="display" width="100%" id={tableName} ref={tableRef}></table>
        </div>

    )
}