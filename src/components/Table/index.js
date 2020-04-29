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
        };
        const { model } = this.props;
        this.data = model.store.data;
        this.columns = model.store.columns;
        this.colors = this.props.colors;

        this.columnDataType = {};

        if (this.columns.length > 0) {
            this.columns.map(col => (
                this.columnDataType[col.dataIndex] = col.columnDataType
            ))
        }



        this.dragProps = {
            onDragEnd(fromIndex, toIndex) {
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



    renderCustomTableColumnHeader = (col, title) => {
        const { setFilterArrProperties, setSorterArrProperties, filterArr, sorterArr } = this.props.model.store;
        return (
            <CustomTableColumnHeader
                key={col.dataIndex}
                title={title}
                dataIndex={col.dataIndex}
                colors={this.colors}
                setShowFilter={this.setShowFilter}
                columnDataType={this.columnDataType}
                filterArr={filterArr}
                setShowSorter={this.setShowSorter}
                setFilterArrProperties={setFilterArrProperties}
                setSorterArrProperties={setSorterArrProperties}
                sorterArr={sorterArr}
            />
        )
    }

    preProcessData = ({ columns }) => {
        let updatedColumns = JSON.parse(JSON.stringify(columns))
        if (columns) {
            updatedColumns.forEach(col => {
                const title = col.titleString;
                col.title = this.renderCustomTableColumnHeader(col, title)
                return col
            })
        }
        return updatedColumns;
    }





    setShowFilter = () => {
        this.setState({ showFilter: !this.state.showFilter })
    }

    setShowSorter = () => {
        this.setState({ showSorter: !this.state.showSorter })
    }

    handleTableSearch = (searchText) => {
        const { setSearchText } = this.props.model.store;
        setSearchText(searchText);
    }


    render() {
        const { store } = this.props.model;
        const { computedData, columns, setSorterArrProperties, setFilterArrProperties, sorterArr, filterArr } = store;
        const customColums = this.preProcessData(store);
        return (
            <div >
                <TableHeader
                    colors={this.colors}
                    columns={columns}
                    handleTableSearch={this.handleTableSearch}
                    columnDataType={this.columnDataType}
                    showFilter={this.state.showFilter}
                    setShowFilter={this.setShowFilter}
                    showSorter={this.state.showSorter}
                    setShowSorter={this.setShowSorter}
                    setFilterArrProperties={setFilterArrProperties}
                    filterArr={filterArr}
                    sorterArr={sorterArr}
                    setSorterArrProperties={setSorterArrProperties}
                />
                <div className={s.rootTable(this.props.colors)}>
                    <Table
                        bordered
                        scroll={{ x: 1300 }}
                        pagination={{
                            total: computedData.length,
                            showTotal: total => `total ${total} items`,
                            responsive: true,
                            defaultPageSize: 10,
                            pageSizeOptions: ['10', '20', '50', '100', '500', '1000']

                        }}
                        columns={customColums}
                        summary={(pageData) =>
                            <TableSummary
                                colors={this.colors}
                                pageData={pageData}
                                columnDataType={this.columnDataType}
                                columns={columns}
                            />}
                        dataSource={computedData} />
                </div>
            </div>
        )
    }
}

export default observer(TableComp);