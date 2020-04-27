import React from 'react';
import { Input, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SortAction from './Actions/SortAction';
import FilterAction from './Actions/FilterAction';
import * as s from './styles';
function TableHeader(props) {
    return (
        <div className={s.rootTableHeader}>
            <div className="table-header-filter-button">
                <FilterAction
                    columns={props.columns}
                    columnDataType={props.columnDataType}
                    showFilter={props.showFilter}
                    setShowFilter={props.setShowFilter}
                    setFilterArrProperties={props.setFilterArrProperties}
                    filterArr={props.filterArr}
                    handleChangeInFilterArr={props.handleChangeInFilterArr}
                    handleAddInFilterArr={props.handleAddInFilterArr} />
            </div>
            <div className="table-header-sort-button">
                <SortAction
                    columns={props.columns}
                    handleSorter={props.handleSorter}
                    sorterArr={props.sorterArr}
                    setSorterArrProperties={props.setSorterArrProperties}
                />
            </div>
            <div role="button" className="table-header-search-button">
                <div className="search-icon"><SearchOutlined /></div>
                <div className="search-input">
                    <Input
                        placeholder="type to search"
                        allowClear
                        onChange={(e) => props.handleTableSearch(e.target.value)} />
                </div>
            </div>
        </div>
    )
}
export default TableHeader;