import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import SortAction from './Actions/SortAction';
import FilterAction from './Actions/FilterAction';
import * as s from './styles';
function TableHeader({
    columns,
    columnDataType,
    showFilter,
    setShowFilter,
    colors,
    setFilterArrProperties,
    filterArr,
    sorterArr,
    showSorter,
    setShowSorter,
    setSorterArrProperties,
    handleTableSearch }) {
    const filterArrlength = filterArr.length;
    const sorterArrLength = sorterArr.length;
    const handleTableSearchDebounce = debounce(handleTableSearch, 300);
    return (
        <div className={s.rootTableHeader(colors, filterArrlength, sorterArrLength)}>
            <div className="table-header-filter-button">
                <FilterAction
                    columns={columns}
                    columnDataType={columnDataType}
                    showFilter={showFilter}
                    colors={colors}
                    setShowFilter={setShowFilter}
                    setFilterArrProperties={setFilterArrProperties}
                    filterArr={filterArr}
                />
            </div>
            <div className="table-header-sort-button">
                <SortAction
                    columns={columns}
                    colors={colors}
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
                        onChange={(e) => handleTableSearchDebounce(e.target.value)} />
                </div>
            </div>
        </div>
    )
}
export default TableHeader;