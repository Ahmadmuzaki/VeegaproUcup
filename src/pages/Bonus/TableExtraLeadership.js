import React, { useEffect, useRef } from "react"
import $ from 'jquery'
import moment from "moment"
import { numberWithCommas } from "../../utils/numberwithcomma"

export function TableExtraLeadership(props) {

    $.DataTable = require('datatables.net-responsive-dt')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "tableextraleadership"

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
                        title: "Package", data: "package",
                        render: function (data, type, row) {
                            return data.name
                        }
                    },
                    {
                        title: "Amount", data: "amount",
                        render: function (data, type, row) {
                            return 'Rp. ' + numberWithCommas(data)
                        }
                    },
                    { title: "Description", data: "note" },

                ],
                destroy: true,  // I think some clean up is happening here
                searching: true,
                responsive: true,
            }
        )
        $('#example tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('#button').click(function () {
            table.row('.selected').remove().draw(false);
        });
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