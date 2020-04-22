import React, { Component } from 'react';
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
            ],
            count: 3
        };
    }



    render() {

        return (
            <div className={s.rootTable(this.props.mode)}>
                <Table
                    bordered
                    scroll={{ x: 1300 }}
                    columns={this.state.columns}
                    dataSource={this.state.data} />
            </div>
        )
    }
}

export default TableComp;