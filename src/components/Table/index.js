import React, { Component } from 'react';
import CustomTableHeader from './CustomTableHeader';
import { Table } from 'antd';
import * as s from './styles';
import TableHeader from './TableHeader';


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
                },
                {
                    title: 'Amount',
                    dataIndex: 'amount',
                    width: 100,
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    width: 100,
                },
                {
                    title: 'Note',
                    dataIndex: 'note',
                    width: 100,
                },
            ],
            count: 3
        };
    }



    render() {

        return (
            <div>
                <TableHeader />
                <div className={s.rootTable}>
                    <Table
                        bordered
                        columns={this.state.columns}
                        dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}

export default TableComp;