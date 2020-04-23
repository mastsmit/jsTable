import React, { Component } from 'react';
import CustomTableHeader from './CustomTableHeader';
import TableHeader from './TableHeader';
import { Table } from 'antd';
import * as s from './styles';
import ReactDragListView from 'react-drag-listview'

const preProcessData = ({ columns }) => {
    if (columns) {
        columns[0].fixed = 'left';
        const title = columns[0].title;
        columns[0].title = () => <CustomTableHeader title={title} />
    }
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
        this.dragProps = {
            onDragEnd(fromIndex, toIndex) {
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