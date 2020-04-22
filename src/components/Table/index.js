import React, { Component } from 'react';
// import { getColumns } from './helpers/getColumns';
import RowTableActions from './RowTableActions';
import CustomTableHeader from './CustomTableHeader';
import { Table } from 'antd';
import * as s from './styles';


class TableComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: 0,
                    date: '2018-02-11',
                    amount: 120,
                    type: 'income',
                    note: 'transfer',
                },
                {
                    key: 1,
                    date: '2018-03-11',
                    amount: 243,
                    type: 'income',
                    note: 'transfer',
                },
                {
                    key: 2,
                    date: '2018-04-11',
                    amount: 98,
                    type: 'income',
                    note: 'transfer',
                },
            ],
            columns: [
                {
                    width: 50,
                    render: () => <RowTableActions handleAdd={this.addRow} />,
                    fixed: 'left',
                },

                {
                    title: () => <CustomTableHeader />,
                    dataIndex: 'date',
                    width: 200,
                    fixed: 'left',
                },
                {
                    title: 'Amount',
                    dataIndex: 'amount',
                },
                {
                    title: 'Column1',
                    dataIndex: 'column1',
                },
                {
                    title: 'Column2',
                    dataIndex: 'column2',
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                },
                {
                    title: 'Note',
                    dataIndex: 'note',
                },
                {
                    title: () => <RowTableActions isFromColumn={true} handleAdd={this.addColumn} />,
                    key: 'action',
                    width: 100,
                    fixed: 'right'
                },
            ],
            count: 3
        };
    }



    // components = {
    //     header: {
    //         cell: () => <CustomTableHeader />
    //     }
    // }

    onCellClick = (record, e) => {
        console.log('record', record, 'event', e);
    }

    addRow = (record, index) => {
        const { count, data } = this.state;
        const newData = { key: count, name: '', age: '', address: '' }
        this.setState({
            data: [...data, newData],
            count: count + 1
        })
    }

    addColumn = (record, index) => {
        console.log('index', index);
    }

    render() {

        return (
            <div className={s.rootTable(this.props.mode)}>
                <Table
                    bordered
                    scroll={{ x: 1300 }}
                    columns={this.state.columns}
                    // components={this.components}
                    dataSource={this.state.data} />
            </div>
        )
    }
}

export default TableComp;