import React, { useEffect, useRef } from "react"
import $ from 'jquery'
import moment from "moment"
import { numberWithCommas } from "../../utils/numberwithcomma"

export function TableGlobalPool(props) {

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "table3"

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
                    {
                        title: "Amount", data: "amount",
                        render: function (data) {
                            return numberWithCommas(parseInt(data))
                        }
                    },
                    { title: "Description", data: "description" },

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