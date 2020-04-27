import React, { Component } from 'react';
import CustomTableColumnHeader from './CustomTableHeader';
import TableHeader from './TableHeader';
import TableSummary from '../TableSummary';
import { Table } from 'antd';
import * as s from './styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ReactDragListView from 'react-drag-listview'


class TableComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.dataSource,
            columns: this.props.columns,
            showFilter: false,
            filterArr: [],
            sorterArr: [],
        };
        console.log('called super------')

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
        this.preProcessData(this.props, this.setShowFilter, this.handleAddInFilterArr);
    }


    handelSorter = (column, order) => {

    }

    renderCustomTableHeader = (col, title) => {

        return (
            <CustomTableColumnHeader
                key={col.dataIndex}
                title={title}
                dataIndex={col.dataIndex}
                setShowFilter={this.setShowFilter}
                columnDataType={this.columnDataType}
                filterArr={this.state.filterArr}
                setFilterArrProperties={this.setFilterArrProperties}
                handleAddInFilterArr={this.handleAddInFilterArr}
                setSorterArrProperties={this.setSorterArrProperties}
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
                col.title = this.renderCustomTableHeader(col, title)
                return col
            })
            console.log('came here----smit')
            this.setState({
                columns: updatedColumns
            });
        }
        console.log('updatedcolumns', updatedColumns);
        return updatedColumns;
    }



    setFilterArrProperties = (properties) => {
        this.setState({ filterArr: properties });
    }

    setSorterArrProperties = (properties) => {
        console.log('properties', properties);
        this.setState({ sorterArr: properties });

    }

    getTransformedData = () => {
        const properties = this.state.sorterArr;
        const compare = (a, b) => {
            if (properties[0]) {
                const first = a[properties[0]['column']]
                const second = b[properties[0]['column']]
                console.log('a', first, 'b', second);
                if (first && second) {
                    if (first < second) {
                        if (properties[0]['order'] === 'ascending') return -1;
                        else return 1;
                    }
                    if (first > second) {
                        if (properties[0]['order'] === 'ascending') return 1;
                        else return -1;
                    }
                    return 0;
                }
            }
            else return 1;

        }
        return this.props.dataSource.sort(compare);
    }

    setShowFilter = () => {
        console.log('showing jlkjkljklj', this.state.showFilter)
        this.setState({ showFilter: !this.state.showFilter })
    }

    handleTableSearch = (searchText) => {
        const searchedData = this.props.dataSource.filter(obj => {
            const tempArr = []
            for (let key in obj) {
                if (key !== 'key') {
                    tempArr.push(obj[key]);
                }
            }
            return JSON.stringify(tempArr).includes(searchText);
        })
        console.log('searchedData', searchedData);
        this.setState({ data: searchedData })
    }


    render() {

        return (
            <div>
                <TableHeader
                    columns={this.state.columns}
                    handleTableSearch={this.handleTableSearch}
                    handelSorter={this.handelSorter}
                    columnDataType={this.columnDataType}
                    showFilter={this.state.showFilter}
                    setShowFilter={this.setShowFilter}
                    setFilterArrProperties={this.setFilterArrProperties}
                    filterArr={this.state.filterArr}
                    sorterArr={this.state.sorterArr}
                    setSorterArrProperties={this.setSorterArrProperties}
                    handleAddInFilterArr={this.handleAddInFilterArr} />
                <div className={s.rootTable(this.props.colors)}>
                    <Table
                        bordered
                        scroll={{ x: 1300 }}
                        pagination={{
                            total: this.state.data.length,
                            showTotal: total => `total ${total} items`,
                            responsive: true,
                            pageSize: 4
                        }}
                        columns={this.state.columns}
                        summary={(pageData) =>
                            <TableSummary
                                pageData={pageData}
                                columnDataType={this.columnDataType}
                                columns={this.state.columns}
                            />}
                        dataSource={this.getTransformedData()} />
                </div>
                {this.state.sorterArr.map(a => <div>{a.column}</div>)}
                {/* <div>
                    <div role="button" onClick={() => { this.setState({ showFilter: true }) }}> click me</div>
                </div> */}
            </div>
        )
    }
}

export default TableComp;