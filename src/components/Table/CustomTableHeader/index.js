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

function CustomTableHeader({ title }) {
    const [columnPropertyName, setColumnPropertyName] = useState("");

    const handleClick = () => (e) => {
    }


    const menu = () => {
        const data = [
            {
                name: "Title",
                key: 'title',
                icon: <FontSizeOutlined />,
                selected: false
            },
            {
                name: 'Add filter',
                key: 'addFilter',
                disabled: false,
                icon: <FilterOutlined />,
                selected: false
            },
            {
                name: 'Sort Ascending',
                key: 'sortAscending',
                disabled: false,
                icon: <ArrowUpOutlined />,
                selected: false
            },
            {
                name: 'Sort Descending',
                key: 'sortDescending',
                disabled: false,
                icon: <ArrowDownOutlined />,
                selected: false
            },
            {
                name: 'Insert Left',
                key: 'insertLeft',
                disabled: false,
                icon: <ArrowLeftOutlined />,
                selected: false
            },
            {
                name: 'Insert Right',
                key: 'insertRight',
                disabled: false,
                icon: <ArrowRightOutlined />,
                selected: false
            }
        ];
        return (

            <div className={s.dropDownStyles}>{
                data.map(func => {
                    return (
                        <Menu key={func.name} onClick={handleClick()}>
                            <Menu.Item key={func.key}>
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
                <div >{title}</div>
            </Dropdown>
        </React.Fragment>
    )
}
export default CustomTableHeader;