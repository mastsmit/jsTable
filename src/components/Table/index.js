import React, { Component } from 'react';
import CustomTableHeader from './CustomTableHeader';
import TableHeader from './TableHeader';
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



    render() {

        return (
            <div>
                <TableHeader />
                <div className={s.rootTable(this.props.colors)}>
                    <ReactDragListView.DragColumn {...this.dragProps}>
                        <Table
                            bordered
                            scroll={{ x: 1300 }}
                            columns={this.state.columns}
                            dataSource={this.state.data} />
                    </ReactDragListView.DragColumn>
                </div>
            </div>
        )
    }
}

export default TableComp;