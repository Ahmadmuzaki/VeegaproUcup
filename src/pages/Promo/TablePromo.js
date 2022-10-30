import React, { useEffect, useRef, useState } from "react"
import $ from 'jquery'
import moment from "moment"
import { numberWithCommas } from "../../utils/numberwithcomma"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import axios from 'axios';
import Swal from "sweetalert2"

const axios2 = axios.create();

export function TablePromo(props) {

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "tablepromo"

    const [dataId, setDataId] = useState()
    const [file, setFile] = useState()
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }

    function handleImage(e) {
        if (e === null) {
            return "-"
        } else {
            return `<a href="https://veeoffice.com/assets/bukti-transfer-promo/${e}">
            <img class="w-75" src="https://veeoffice.com/assets/bukti-transfer-promo/${e}" alt="" /></a>`
        }

    }

    function handleStatus(e) {
        if (e === 'requested') {
            return `<span class="badge bg-warning ">Requested</span>`
        } else if (e === 'pending') {
            return `<span class="badge bg-warning ">Pending</span>`
        } else if (e === 'cancel') {
            return `<span class="badge bg-danger ">Cancel</span>`
        } else if (e === 'approved') {
            return `<span class="badge bg-success ">Approved</span>`
        } else {
            return e
        }
    }

    function handleUploadButton(data, type, full) {
        const dataImage = full.image_transfer
        if (dataImage === null) {
            return '<button class="btn btn-warning btn-sm text-sm">Upload Bukti Transfer</button>'
        } else {
            return ""
        }
    }

    useEffect(() => {
        // console.log(tableRef.current)
        const table = $(`#${tableName}`).DataTable(
            {
                data: props.data,
                columns: [
                    {
                        title: "Date/Time", data: "created_at",
                        render: function (data, type, row) {
                            return moment(data).format('YYYY-MM-DD HH:mm:ss')
                        }
                    },
                    { title: "Promo Name", data: "promo_name" },
                    { title: "Qty", data: "quantity" },
                    {
                        title: "Total Amount", data: "promo_price",
                        render: function (data) {
                            return 'Rp. ' + numberWithCommas(data)
                        }
                    },
                    {
                        title: "Expired Transfer", data: "expired",
                        render: function (data, type, row) {
                            return moment(data).format('YYYY-MM-DD HH:mm:ss')
                        }
                    },
                    {
                        title: "Image", data: "image_transfer",
                        render: function (data, type, row) {
                            return handleImage(data)

                        }
                    },
                    {
                        title: "Status", data: "status",
                        render: function (data) {
                            return handleStatus(data.toLowerCase())
                        }
                    },
                    { title: "Note", data: "notes" },
                    {
                        title: "Action",
                        data: null,
                        width: '18%',
                        render: function (data, type, full) {
                            return handleUploadButton(data, type, full)
                        }
                    },

                ],
                destroy: true,  // I think some clean up is happening here
                searching: true,
                responsive: true,
            }
        )
        // Extra step to do extra clean-up.

        $(`#${tableName} tbody`).on('click', 'button', async function () {
            const data = await table.row($(this).parents('tr')).data();
            // if (data.id !== undefined) {
            //     console.log(data.id);
            // }
            try {
                setDataId(data.id)
                setModal(true)
            } catch (error) {

            }
        });
    }, [props.data])

    function handleOnchangeUpload(e) {
        setFile(e.target.files[0])
    }
    const config = {
        headers: {
            'Authorization': 'Bearer' + localStorage.getItem('token'),
            'content-type': 'multipart/form-data'
        },
    }
    async function handleUploadBukti() {
        // console.log(file);
        let dataUpload = new FormData()
        dataUpload.append('upload', file)
        // for (const value of dataUpload.entries()) {
        //     console.log("halo guyss", value);
        // }
        axios2.post(`https://veeoffice.com/api/promo/upload-bukti-transfer/${dataId}`, dataUpload, config)
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
                        setModal(false)
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
    return (
        <div>
            <Modal
                isOpen={modal}
                toggle={toggle}
                centered
            >
                <ModalHeader toggle={toggle} >
                    Upload Bukti Transfer Sekarang
                </ModalHeader>
                <ModalBody>
                    <input type="file" className="form-control" onChange={handleOnchangeUpload} />
                </ModalBody>
                <center>
                    <button className="my-3 btn btn-primary d-flex btn-block" onClick={handleUploadBukti}>Upload Bukti Transfer</button>
                </center>
            </Modal>
            <table className="display" width="100%" id={tableName} ref={tableRef}></table>
        </div>

    )
}