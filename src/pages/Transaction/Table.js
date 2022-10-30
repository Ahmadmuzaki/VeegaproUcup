import React, { useEffect, useRef } from "react"
import $ from 'jquery'
import moment from "moment"
import { numberWithCommas } from "../../utils/numberwithcomma"

export function Table(props) {

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "table1"

    function handleStatus(e) {
        if (e === 'pending') {
            return `<span class="badge bg-warning ">Pending</span>`
        } else if (e === 'reject') {
            return `<span class="badge bg-danger ">Reject</span>`
        } else if (e === 'done')  {
            return `<span class="badge bg-success ">Done</span>`
        } else{
            return e
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
                    { title: "Package", data: "package" },
                    {
                        title: "Method", data: "method",
                    },
                    {
                        title: "Note Purchase", data: "note_purchase",
                        render: function (data, type, row) {
                            return data === null ? "-" : data
                        }
                    },
                    {
                        title: "Note Pickup", data: "note_pickup",
                        render: function (data) {
                            return data === null ? "-" : data
                        }
                    },
                    {
                        title: "Amount", data: "amount",
                        render: function (data, type, row) {
                            return 'Rp. ' + numberWithCommas(data)
                        }
                    },
                    {
                        title: "Status Purchase", data: "status_purchase",
                        render: function (data) {
                            return handleStatus(data.toLowerCase())
                        }
                    },
                    {
                        title: "Status Pickup", data: "status_pickup",
                        render: function (data) {
                            return handleStatus(data.toLowerCase())
                        }
                    }

                ],
                destroy: true,  // I think some clean up is happening here
                searching: true,
                responsive: true,
            }
        )
        // Extra step to do extra clean-up.
        return function () {

            table.destroy()
        }
    })
    return (
        <div>
            <table className="display" width="100%" id={tableName} ref={tableRef}></table>
        </div>

    )
}