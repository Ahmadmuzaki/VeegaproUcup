import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    TreeDataState,
    CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';
import Axios from 'axios';

const axios2 = Axios.create()


const config = {
    headers: {
        'Authorization': 'Bearer' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const getChildRows = (row, rootRows) => (row ? row.placement_tree : rootRows);

export default function TreeViewReferral() {
    const [dataApi, setDataApi] = useState([])
    const [columns] = useState([
        { name: 'username', title: 'Name' },
        { name: 'referall', title: 'Sponsor' },
        { name: 'join_date', title: 'Join Date' },
        { name: 'package', title: 'Package' },
        { name: 'rank', title: 'Rank' },
    ]);


    useEffect(() => {
        axios2.get('https://veeoffice.com/api/referral-tree', config)
            .then(res => {
                setDataApi(res.data.data)
            })
    }, []);

    // const [data] = useState(generateRows({
    //     columnValues: {
    //         ...defaultColumnValues,
    //         items: ({ random }) => (random() > 0.5
    //             ? generateRows({
    //                 columnValues: {
    //                     ...defaultColumnValues,
    //                     items: () => (random() > 0.5
    //                         ? generateRows({
    //                             columnValues: {
    //                                 ...defaultColumnValues,
    //                             },
    //                             length: Math.trunc(random() * 5) + 1,
    //                             random,
    //                         })
    //                         : null),
    //                 },
    //                 length: Math.trunc(random() * 3) + 1,
    //                 random,
    //             })
    //             : null),
    //     },
    //     length: 3,
    // }));
    const [tableColumnExtensions] = useState([
        { columnName: 'username', width: 600 },
    ]);

    return (
        <Paper>
            <Grid
                rows={dataApi}
                columns={columns}
            >
                <TreeDataState />
                <CustomTreeData
                    getChildRows={getChildRows}
                />
                <Table
                    columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow />
                <TableTreeColumn
                    for="username"
                />
            </Grid>
        </Paper >
    );
};
