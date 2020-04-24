import React, { useState } from 'react';
import { Menu, Dropdown, Button, Input } from 'antd';
import Title from 'antd/lib/skeleton/Title';
import ReactDragListView from 'react-drag-listview'

import {
    FilterOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    FontSizeOutlined
} from '@ant-design/icons';
import * as s from '../styles';

function CustomTableHeader(props) {
    const [columnPropertyName, setColumnPropertyName] = useState("");

    const menu = () => {
        const data = [
            {
                name: 'Add filter',
                disabled: false,
                icon: <FilterOutlined />,
                selected: false
            },
            {
                name: 'Sort Ascending',
                disabled: false,
                icon: <ArrowUpOutlined />,
                selected: false
            },
            {
                name: 'Sort Descending',
                disabled: false,
                icon: <ArrowDownOutlined />,
                selected: false
            },
            {
                name: 'Insert Left',
                disabled: false,
                icon: <ArrowLeftOutlined />,
                selected: false
            },
            {
                name: 'Insert Right',
                disabled: false,
                icon: <ArrowRightOutlined />,
                selected: false
            }
        ];
        return (
            <div className={s.dropDownStyles}>{
                data.map(func => {
                    return (
                        <Menu>
                            <Menu.Item>
                                <React.Fragment>
                                    {func.icon}
                                    <div style={{ display: "contents" }}>{func.name}</div>
                                </React.Fragment>
                            </Menu.Item>
                        </Menu>
                    )
                })
            }</div>

        )

    }



    return (
        <React.Fragment>
            <Dropdown overlay={menu()} trigger={['click']}>
                <div >Smit</div>
            </Dropdown>
        </React.Fragment>
    )
}
export default CustomTableHeader;