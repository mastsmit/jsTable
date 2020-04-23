import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function TableSummary(props) {

    const handleClick = (col) => (e) => {
        console.log(e.key, col.dataIndex);
    }
    const getSummaryDropdown = (col) => {
        return (
            <Menu onClick={handleClick(col)}>
                <Menu.Item key="none">None</Menu.Item>
                <Menu.Item key="countAll">Count all</Menu.Item>
                <Menu.Item key="countUniqueValues">Count unique values</Menu.Item>
                <Menu.Item key="countEmpty">Count empty</Menu.Item>
                <Menu.Item key="countNotEmpty">Connt not empty</Menu.Item>
            </Menu>
        )
    }
    return (
        <tr>
            {props.columns.map(col => (
                <Dropdown trigger="click" overlay={getSummaryDropdown(col)}>
                    <th className='table-summary'>
                        <div style={{ display: 'flex' }}>
                            <div>
                                Calculate
                            </div>
                            <div><DownOutlined />
                            </div>
                        </div>
                    </th>
                </Dropdown>
            ))}
        </tr>
    )
}
export default TableSummary;