import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import * as s from './styles';
function TableHeader(props) {
    return (
        <div className={s.rootTableHeader}>
            <div role="button" className="table-header-filter-button">
                Filter
            </div>
            <div role="button" className="table-header-sort-button">
                Sort
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