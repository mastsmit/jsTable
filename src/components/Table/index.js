import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CustomTableColumnHeader from './CustomTableColumnHeader';
import TableHeader from './TableHeader';
import TableSummary from '../TableSummary';
import ReactDragListView from 'react-drag-listview';
import { Table, Modal } from 'antd';
import * as s from './styles';

const { confirm } = Modal;
class TableComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilter: false,
            showSorter: false,
            currentPageNumber: 1,
            currentPageSize: 10
        };
        const { model } = this.props;
        this.columns = model.store.columns;

        this.columnDataType = {};

        if (this.columns.length > 0) {
            this.columns.map(col => (
                this.columnDataType[col.dataIndex] = col.columnDataType
            ))
        }
    }

    renderCustomTableColumnHeader = (col, title) => {
        const colors = this.props.colors;
        const { setFilterArrProperties, setSorterArrProperties, filterArr, sorterArr } = this.props.model.store;
        return (
            <CustomTableColumnHeader
                key={col.dataIndex}
                title={title}
                dataIndex={col.dataIndex}
                colors={colors}
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
        updatedColumns.forEach(col => {
            const title = col.titleString;
            col.title = this.renderCustomTableColumnHeader(col, title)
            return col
        })
        return updatedColumns;
    }



    showConfirmationModal = (setSorterArrProperties) => {
        confirm({
            title: 'Would you like to remove sorting',
            okText: 'Remove',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                setSorterArrProperties([]);
            },
        })
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
        const colors = this.props.colors;
        const { setData, data, computedData, setTableColumn, columns, setSorterArrProperties, setFilterArrProperties, sorterArr, filterArr } = store;
        const customColumns = this.preProcessData(store);
        const columnDragProps = {
            onDragEnd: (fromIndex, toIndex) => {
                if (fromIndex === 0 || toIndex === 0) {
                    return
                }
                const tempColumns = columns;
                const item = tempColumns.splice(fromIndex, 1)[0];
                tempColumns.splice(toIndex, 0, item);
                setTableColumn(store, tempColumns);
            },
            nodeSelector: "th.ant-table-cell",
        };

        const rowDragProps = {
            onDragEnd: (fromIndex, toIndex) => {
                if (sorterArr.length > 0) {
                    this.showConfirmationModal(setSorterArrProperties);
                    return;
                }
                const offset = (this.state.currentPageNumber - 1) * this.state.currentPageSize;
                const fromObject = computedData[offset + fromIndex - 1];
                const toObject = computedData[offset + toIndex - 1];

                let fromObjectIndex = 0;
                let toObjectIndex = 0;


                data.forEach((obj, index) => {
                    if (obj.key === fromObject.key) {
                        fromObjectIndex = index;
                    } else if (obj.key === toObject.key) {
                        toObjectIndex = index;
                    }
                });
                console.log('fromObj', fromObject, toObject, fromObjectIndex, toObjectIndex, fromIndex, toIndex)
                const tempData = data;
                const item = tempData.splice(fromObjectIndex, 1)[0];
                tempData.splice(toObjectIndex, 0, item);
                setData(store, tempData);
            },
            nodeSelector: "tr.ant-table-row",
        };

        return (
            <div >
                <TableHeader
                    colors={colors}
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
                    inputTextArr={inputTextArr}
                    setSorterArrProperties={setSorterArrProperties}
                />
                <div className={s.rootTable(this.props.colors)}>
                    <ReactDragListView {...rowDragProps} lineClassName={s.lineClassName()}>
                        <ReactDragListView.DragColumn {...columnDragProps} lineClassName={s.lineClassName()}>
                            <Table
                                bordered
                                scroll={{ x: 1300, y: 450 }}
                                pagination={{
                                    current: this.state.currentPageNumber,
                                    total: computedData.length,
                                    showTotal: total => `total ${total} items`,
                                    responsive: true,
                                    pageSize: this.state.currentPageSize,
                                    onChange: (page) => this.setState({ currentPageNumber: page }),
                                    onShowSizeChange: (page, pageSize) => this.setState({ currentPageSize: pageSize, currentPageNumber: page }),
                                    showSizeChanger: true,
                                    pageSizeOptions: [10, 20, 50, 100, 500, 1000]
                                }}
                                columns={customColumns}
                                summary={() =>
                                    <TableSummary
                                        colors={colors}
                                        pageData={computedData}
                                        columnDataType={this.columnDataType}
                                        columns={columns}
                                    />}
                                dataSource={computedData}
                                {...this.props}
                            />
                        </ReactDragListView.DragColumn>
                    </ReactDragListView>
                </div>
            </div >
        )
    }
}

export default observer(TableComp);