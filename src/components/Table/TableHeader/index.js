import React from 'react';
import { Input, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SortAction from './Actions/SortAction';
import FilterAction from './Actions/FilterAction';
import * as s from './styles';
function TableHeader(props) {
    const handleChange = (value) => {
        console.log('value', value);
    }

    
    return (
        <div className={s.rootTableHeader}>
            <div className="table-header-filter-button">
                <FilterAction columns={props.columns} columnDataType={props.columnDataType} />
            </div>
            <div className="table-header-sort-button">
                <SortAction handleChange={handleChange} columns={props.columns} handleSorter={props.handleSorter} />
            </div>
            <div role="button" className="table-header-search-button">
                <div className="search-icon"><SearchOutlined /></div>
                <div className="search-input">
                    <Input
                        placeholder="type to search"
                        allowClear
                        onChange={(e) => props.handleSearch(e.target.value)} />
                </div>
            </div>
        </div>
    )
}
export default TableHeader;