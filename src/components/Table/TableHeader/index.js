import React from 'react';
import { Input, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SortAction from './Actions/SortAction';
import * as s from './styles';
function TableHeader(props) {
    const handleChange = (value) => {
        console.log('value', value);
    }
    return (
        <div className={s.rootTableHeader}>
            <div role="button" className="table-header-filter-button">
                Filter
            </div>
            <div className="table-header-sort-button">
                <SortAction handleChange={handleChange} />
            </div>
            <div role="button" className="table-header-search-button">
                <div className="search-icon"><SearchOutlined /></div>
                <div className="search-input">
                    <Input
                        placeholder="type to search"
                        allowClear
                        onChange={(e) => console.log(e.target.value)} />
                </div>
            </div>
        </div>
    )
}
export default TableHeader;