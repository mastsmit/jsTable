import React from 'react';
import { Menu, Dropdown, Button, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import {
    FilterOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    FontSizeOutlined,
} from '@ant-design/icons';
import * as s from '../styles';

function CustomTableColumnHeader({ title,
    setShowFilter,
    setFilterArrProperties,
    columnDataType,
    dataIndex,
    setSorterArrProperties,
    sorterArr,
    filterArr,
    setShowSorter }) {

    const handleClick = (dataIndex) => (e) => {
        console.log('clickedThisManyTimes', dataIndex);
        switch (e.key) {
            case 'addFilter': {
                console.log('inAddFilterCase');
                const id = uuidv4();
                setFilterArrProperties([...filterArr, {
                    id,
                    column: dataIndex,
                    filters: columnDataType[dataIndex] === 'text' ? 'contains' : 'equalTo',
                    condition: 'and',
                    textInput: ''
                }])
                setShowFilter()
                break;
            }
            case 'sortAscending': {
                console.log('inSortAscendingCase');
                const id = uuidv4();
                setSorterArrProperties([...sorterArr, {
                    id,
                    order: 'ascending',
                    column: dataIndex
                }])
                setShowSorter();
                break;
            }
            case 'sortDescending':
                const id = uuidv4();
                const temp = [...sorterArr, {
                    id,
                    order: 'descending',
                    column: dataIndex
                }]
                console.log('tempSorterArr', temp);
                setSorterArrProperties(temp)
                break;
            default:
                return
        }
    }


    const menu = () => {
        const data = [
            // {
            //     name: "Title",
            //     key: 'title',
            //     icon: <FontSizeOutlined />,
            //     selected: false
            // },
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
            // {
            //     name: 'Insert Left',
            //     key: 'insertLeft',
            //     disabled: false,
            //     icon: <ArrowLeftOutlined />,
            //     selected: false
            // },
            // {
            //     name: 'Insert Right',
            //     key: 'insertRight',
            //     disabled: false,
            //     icon: <ArrowRightOutlined />,
            //     selected: false
            // }
        ];
        return (
            <div className={s.dropDownStyles}>{
                data.map(func => {
                    return (
                        <Menu key={func.name} onClick={handleClick(dataIndex)}>
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
export default CustomTableColumnHeader;