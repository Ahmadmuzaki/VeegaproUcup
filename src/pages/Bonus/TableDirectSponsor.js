import React, { useEffect, useRef } from "react"
import $ from 'jquery'
import moment from "moment"

export function TableDirectSponsor(props) {

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "table1"

    useEffect(() => {
        // console.log(tableRef.current)
        const table = $(`#${tableName}`).DataTable(
            {
                data: props.data,
                columns: [
                    {
                        title: "Date/Time", data: "datetime",
                        render: function (data, type, row) {
                            return moment(data).format('YYYY-MM-DD HH:mm:ss')
                        }
                    },
                    { title: "Package", data: "package" },
                    { title: "Referral", data: "referral" },
                    { title: "Amount", data: "amount" },

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