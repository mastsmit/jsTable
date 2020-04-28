import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CustomTableColumnHeader from './CustomTableColumnHeader';
import TableHeader from './TableHeader';
import TableSummary from '../TableSummary';
import { Table } from 'antd';
import * as s from './styles';

class TableComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            showSorter: false,
            filterArr: [],
            sorterArr: [],
        };
        const { model } = this.props;
        console.log('model----', model)
        this.data = model.store.data;
        this.columns = model.store.columns;

        this.columnDataType = {};

        this.columns.map(col => (
            this.columnDataType[col.dataIndex] = col.columnDataType
        ))



        this.dragProps = {
            onDragEnd(fromIndex, toIndex) {
                console.log('from inde, tounde', fromIndex, toIndex)
                if (fromIndex === 0 || toIndex === 0) {
                    return
                }
                const columns = this.state.columns;
                const item = columns.splice(fromIndex, 1)[0];
                columns.splice(toIndex, 0, item);
                this.setState({
                    columns
                });
            },
            nodeSelector: "th",
        };
    }

    componentDidMount() {
        this.preProcessData(this.props.model.store, this.setShowFilter, this.handleAddInFilterArr);
    }


    handelSorter = (column, order) => {

    }

    renderCustomTableColumnHeader = (col, title) => {
        const { setFilterArrProperties, setSorterArrProperties } = this.props.model.store;
        return (
            <CustomTableColumnHeader
                key={col.dataIndex}
                title={title}
                dataIndex={col.dataIndex}
                setShowFilter={this.setShowFilter}
                columnDataType={this.columnDataType}
                filterArr={this.state.filterArr}
                setShowSorter={this.setShowFilter}
                setFilterArrProperties={setFilterArrProperties}
                setSorterArrProperties={setSorterArrProperties}
                sorterArr={this.state.sorterArr}
            />
        )
    }

    preProcessData = ({ columns }, setShowFilter, handleFilterArr) => {
        let updatedColumns = []
        if (columns) {
            columns[0].fixed = 'left';
            updatedColumns = columns.map(col => {
                console.log('col-title', col.title);
                const title = col.title;
                col.title = this.renderCustomTableColumnHeader(col, title)
                return col
            })
            console.log('came here----smit')
            this.props.model.store.setTableColumn(updatedColumns);
        }
        console.log('updatedcolumns', updatedColumns);
        return updatedColumns;
    }





    setShowFilter = () => {
        console.log('showing jlkjkljklj', this.state.showFilter)
        this.setState({ showFilter: !this.state.showFilter })
    }

    setShowSorter = () => {
        this.setState({ showSorter: !this.state.showSorter })
    }

    handleTableSearch = (searchText) => {
        this.props.model.store.setSearchText(searchText);
    }


    render() {
        console.log('table-render');
        const { computedData, columns, setSorterArrProperties, setFilterArrProperties, sorterArr, filterArr } = this.props.model.store;
        return (
            <div>
                <TableHeader
                    columns={columns}
                    handleTableSearch={this.handleTableSearch}
                    handelSorter={this.handelSorter}
                    columnDataType={this.columnDataType}
                    showFilter={this.state.showFilter}
                    setShowFilter={this.setShowFilter}
                    showSorter={this.state.showSorter}
                    setShowSorter={this.setShowSorter}
                    setFilterArrProperties={setFilterArrProperties}
                    filterArr={filterArr}
                    sorterArr={sorterArr}
                    setSorterArrProperties={setSorterArrProperties}
                    handleAddInFilterArr={this.handleAddInFilterArr} />
                <div className={s.rootTable(this.props.colors)}>
                    <Table
                        bordered
                        scroll={{ x: 1300 }}
                        pagination={{
                            total: computedData.length,
                            showTotal: total => `total ${total} items`,
                            responsive: true,
                            pageSize: 20,

                        }}
                        columns={columns}
                        summary={(pageData) =>
                            <TableSummary
                                pageData={pageData}
                                columnDataType={this.columnDataType}
                                columns={columns}
                            />}
                        dataSource={computedData} />
                </div>
                {this.state.sorterArr.map(a => <div>{a.column}</div>)}
                {/* <div>
                    <div role="button" onClick={() => { this.setState({ showFilter: true }) }}> click me</div>
                </div> */}
            </div>
        )
    }
}

export default observer(TableComp);