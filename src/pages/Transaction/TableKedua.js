import React, { useEffect, useRef } from "react"
import $ from 'jquery'
import moment from "moment"
import { numberWithCommas } from "../../utils/numberwithcomma"

export function TableKedua(props) {

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "table2"

    function handleStatus(e) {
        if (e === 'pending') {
            return `<span class="badge bg-warning ">Process</span>`
        } else if (e === 'cancle') {
            return `<span class="badge bg-danger ">Cancle</span>`
        } else {
            return `<span class="badge bg-success ">Success</span>`
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
                    { title: "Bank Account", data: "account_name" },
                    {
                        title: "Amount", data: "amount",
                        render: function (data, type, row) {
                            return 'Rp. ' + numberWithCommas(data)
                        }
                    },
                    { title: "Note", data: "note" },
                    {
                        title: "Status", data: "status",
                        render: function (data) {
                            return handleStatus(data)
                        }
                    },

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