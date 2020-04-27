import React, { Component } from 'react';
import CustomTableHeader from './CustomTableHeader';
import TableHeader from './TableHeader';
import TableSummary from '../TableSummary';
import { Table } from 'antd';
import * as s from './styles';
import ReactDragListView from 'react-drag-listview'

const preProcessData = ({ columns, colors }, handleSorter) => {
    let updatedColumns = []
    if (columns) {
        columns[0].fixed = 'left';
        updatedColumns = columns.map(col => {
            console.log('col-title', col.title);
            const title = col.title;
            col.title = <CustomTableHeader key={col.dataIndex} title={title} colors={colors}/>
            return col
        })
    }
    console.log('updatedcolumns', updatedColumns);
    return updatedColumns;
}

class TableComp extends Component {
    constructor(props) {
        super(props);
        preProcessData(this.props);
        this.state = {
            data: this.props.dataSource,
            columns: this.props.columns,
            count: 3
        };

        const that = this;

        this.columnDataType = {};

        this.props.columns.map(col => (
            this.columnDataType[col.dataIndex] = col.columnDataType
        ))

        this.dragProps = {
            onDragEnd(fromIndex, toIndex) {
                console.log('from inde, tounde', fromIndex, toIndex)
                if (fromIndex === 0 || toIndex === 0) {
                    return
                }
                const columns = that.state.columns;
                const item = columns.splice(fromIndex, 1)[0];
                columns.splice(toIndex, 0, item);
                that.setState({
                    columns
                });
            },
            nodeSelector: "th",
        };
    }

    handelSorter = () => {
        console.log('hi');
    }


    render() {

        return (
            <div>
                <TableHeader columns={this.state.columns} handelSorter={this.handelSorter} columnDataType={this.columnDataType} handleSearch={this.props.handleSearch}/>
                <div className={s.rootTable(this.props.colors)}>
                    <ReactDragListView.DragColumn {...this.dragProps}>
                        <Table
                            bordered
                            scroll={{ x: 1300 }}
                            pagination={{
                                total: this.state.data.length,
                                showTotal: total => `total ${total} items`,
                                responsive: true,
                            }}
                            columns={this.state.columns}
                            summary={(pageData) => <TableSummary pageData={pageData} columnDataType={this.columnDataType} columns={this.state.columns} />}
                            dataSource={this.state.data} />
                    </ReactDragListView.DragColumn>
                </div>
            </div>
        )
    }
}

export default TableComp;