import React from 'react';
import { Input, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SortAction from './Actions/SortAction';
import FilterAction from './Actions/FilterAction';
import * as s from './styles';
function TableHeader({
    columns,
    columnDataType,
    showFilter,
    setShowFilter,
    setFilterArrProperties,
    filterArr,
    sorterArr,
    showSorter,
    setShowSorter,
    setSorterArrProperties,
    handleTableSearch}) {
    return (
        <div className={s.rootTableHeader}>
            <div className="table-header-filter-button">
                <FilterAction
                    columns={columns}
                    columnDataType={columnDataType}
                    showFilter={showFilter}
                    setShowFilter={setShowFilter}
                    setFilterArrProperties={setFilterArrProperties}
                    filterArr={filterArr}
                    />
            </div>
            <div className="table-header-sort-button">
                <SortAction
                    columns={columns}
                    showSorter={showSorter}
                    setShowSorter={setShowSorter}
                    sorterArr={sorterArr}
                    setSorterArrProperties={setSorterArrProperties}
                />
            </div>
            <div role="button" className="table-header-search-button">
                <div className="search-icon"><SearchOutlined /></div>
                <div className="search-input">
                    <Input
                        placeholder="type to search"
                        allowClear
                        onChange={(e) => handleTableSearch(e.target.value)} />
                </div>
            </div>
        </div>
    )
}
export default TableHeader;