import React, { useEffect, useRef } from "react"
import $ from 'jquery'
import moment from "moment"
import { numberWithCommas } from "../../utils/numberwithcomma"

export function TableLeveling(props) {

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "tableleveling"

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
                    { title: "Package", data: "description" },
                    {
                        title: "Referral", data: "referall",
                    },
                    { title: "Level/Percentage Level", data: "level" },
                    {
                        title: "Amount", data: "amount",
                        render: function (data) {
                            return numberWithCommas(Number(data))
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