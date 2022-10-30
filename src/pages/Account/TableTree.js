import React, { Component } from 'react'
import { TreeTable, TreeState } from 'cp-react-tree-table';
import { get } from '../../helpers/api_helper';
// import $ from 'jquery'
// import './style.css'

const kudaliar = [
    {
        "data": [
            {
                "text": "Parent 1",
                "href": "#parent1",
                "tags": "4",
                "nodes": [
                    {
                        "text": "Child 1",
                        "nodes": [
                            {
                                "text": "Grandchild 1"
                            },
                            {
                                "text": "Grandchild 2"
                            }
                        ]
                    },
                    {
                        "text": "Child 2"
                    }
                ]
            }
        ]
    }

]

const MOCK_DATA = genData();


export default class TableTree extends Component {
    constructor(props) {
        super(props)

        this.state = {
            treeValue: TreeState.create(MOCK_DATA),
            dataJson: []
        }
    }
    async componentDidMount() {
        // const data = await get('http://localhost:4000/data')
        // $('#treeview1').treeview({
        //     data: kudaliar[0]
        // });
        // this.setState({ dataJson: data })
        // var findObjectByLabel = function (obj, label) {
        //     if (obj.label === label) { return obj; }
        //     for (var i in obj) {
        //         if (obj.hasOwnProperty(i)) {
        //             var foundLabel = findObjectByLabel(obj[i], label);
        //             if (foundLabel) { return foundLabel; }
        //         }
        //     }
        //     return null;
        // }

        // function jsonPrinter(obj) {

        //     for (let key in obj) {
        //         // checking if it's nested
        //         if (obj.hasOwnProperty(key) && (typeof obj[key] === "object")) {
        //             jsonPrinter(obj[key])
        //         } else {
        //             // printing the flat attributes
        //             console.log(key + " -> " + obj[key]);
        //         }
        //     }
        // }
        // function findObjectByLabel(obj, label) {
        //     for (var elements in obj) {
        //         if (elements === label) {
        //             console.log(obj[elements]);
        //         }
        //         if (typeof obj[elements] === 'object') {
        //             findObjectByLabel(obj[elements], 'placement_tree');
        //         }

        //     }
        // };
        // let baru = findObjectByLabel(data, 'placement_tree')
        // console.log("Ini baru baru baru", baru);
    }

    render() {
        const { treeValue } = this.state;
        return (
            <div>
                <div>
                    <h2>Default</h2>
                    <div id="treeview1" class=""></div>
                </div>
                <TreeTable
                    value={treeValue}
                    onChange={this.handleOnChange}>
                    <TreeTable.Column basis="180px" grow="0"
                        renderCell={this.renderIndexCell}
                        renderHeaderCell={() => <span>Name</span>} />
                    <TreeTable.Column
                        renderCell={this.renderEditableCell}
                        renderHeaderCell={() => <span>Contact person</span>} />
                    <TreeTable.Column
                        renderCell={this.renderEmployeesCell}
                        renderHeaderCell={() => <span className="t-right">Employees</span>} />
                    {/* <TreeTable.Column
                        renderCell={this.renderExpensesCell}
                        renderHeaderCell={() => <span className="t-right">Expenses ($)</span>} /> */}
                </TreeTable>
            </div>
        )
    }
    handleOnChange = (newValue) => {
        this.setState({ treeValue: newValue });
    }

    renderIndexCell = (row) => {
        return (
            <div style={{ paddingLeft: (row.metadata.depth * 25) + 'px' }}
                className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>

                <div className='d-flex align-items-center'  >
                    {(row.metadata.hasChildren)
                        ? (
                            <span className="ri-arrow-right-s-fill" onClick={row.toggleChildren}></span>
                        )
                        : ''
                    }

                    <span>{row.data.name}</span>
                </div>
            </div>
        );
    }

    renderEmployeesCell = (row) => {
        return (
            <span className="employees-cell">{row.data.employees}</span>
        );
    }

    // renderExpensesCell = (row) => {
    //     return (
    //         <span className="expenses-cell">{row.data.expenses}</span>
    //     );
    // }

    renderEditableCell = (row) => {
        return (
            <input type="text" value={row.data.contact}
                onChange={(event) => {
                    row.updateData({
                        ...row.data,
                        contact: event.target.value,
                    });
                }} />
        );
    }
}



function genData() {
    // const datai = kudanil
    // let kadal = []
    // let kucing = []
    // console.log("kalsdkfljalskj", datai);

    // if (kudanil.length !== 0) {
    //     for (let i = 0; i < kudanil.length; i++) {
    //         kadal[i] = { data: kudanil[i] };
    //     }
    // }


    // if (kudaliar &&
    //     kudaliar.length !== 0) {

    //     kudaliar.forEach((data, i) => {
    //         console.log(kudaliar[i].code)

    //         if (kudaliar[i].data &&
    //             kudaliar[i].data.length !== 0) {

    //             kudaliar[i].data.forEach((data2, a) => {
    //                 console.log(kudaliar[i].data[a].name);
    //                 console.log(kudaliar[i].data[a].kelas);

    //                 if (kudaliar[i].data[a].organisasi &&
    //                     kudaliar[i].data[a].organisasi.length !== 0) {

    //                     kudaliar[i].data[a].organisasi.forEach((data3, b) => {
    //                         for (let j = 0; j < kudanil.length; j++) {
    //                             kucing[j] = { data: {"nama":kudaliar[i].data[a].organisasi[b].namaorganisasi, "halo":kudaliar[i].data[a].organisasi[b].halo} };
    //                         }
    //                         // console.log(kudaliar[i].data[a].organisasi[b].namaorganisasi);
    //                     })
    //                 }

    //             })
    //         }
    //     })
    // }
    // console.log(kucing);


    return [
        {
            data: { name: 'Kakek Siva', expenses: '180,000', employees: '7', contact: 'William Dallas' },
            height: 32,
        },
        {
            data: { name: 'Kakekku', expenses: '105,000', employees: '22', contact: 'Makenzie Higgs' },
            height: 32,
            children: [
                {
                    data: { name: 'Ayahku', expenses: '75,000', employees: '18', contact: 'Florence Carter' },
                    children: [
                        {
                            data: { name: 'Aku', expenses: '105,000', employees: '22', contact: 'Makenzie Higgs' },
                            children: [
                                {
                                    data: { name: 'Anakku', expenses: '105,000', employees: '22', contact: 'Makenzie Higgs' },
                                    children: [
                                        {
                                            data: { name: 'Anak dari Anakku', expenses: '105,000', employees: '22', contact: 'Makenzie Higgs' },
                                            children: [
                                                {
                                                    data: { name: 'Cucu dari anakku', expenses: '105,000', employees: '22', contact: 'Makenzie Higgs' },
                                                    children: [
                                                        {
                                                            data: { name: 'Cucucucucu', expenses: '105,000', employees: '22', contact: 'Makenzie Higgs' },
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    data: { name: 'Adek Ayahku', expenses: '30,000', employees: '4', contact: 'Selena Rycroft' },
                    height: 32,
                }
            ],
        },
    ];
}