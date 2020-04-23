import React, { Component } from 'react';
// import { getColumns } from './helpers/getColumns';
import RowTableActions from './RowTableActions';
import CustomTableHeader from './CustomTableHeader';
import { Table } from 'antd';
import * as s from './styles';
import ReactDragListView from 'react-drag-listview'


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
                    render: () => <RowTableActions handleAdd={this.addRow} />
                },

                {
                    title: () => <CustomTableHeader />,
                    dataIndex: 'date',
                    width: 200,
                    onCellClick: this.onCellClick
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
                {
                    title: () => <RowTableActions isFromColumn={true} handleAdd={this.addColumn} />,
                    key: 'action',
                },
            ],
            count: 3
        };

        const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const columns = that.state.columns;
        const item = columns.splice(fromIndex, 1)[0];
        columns.splice(toIndex, 0, item);
        that.setState({
          columns
        });
      },
      nodeSelector: "th"
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
            <div className={s.rootTable}>
             <ReactDragListView.DragColumn {...this.dragProps}>
                <Table
                    bordered
                    columns={this.state.columns}
                    // components={this.components}
                    dataSource={this.state.data} />
             </ReactDragListView.DragColumn>

            </div>
        )
    }
}

export default TableComp;