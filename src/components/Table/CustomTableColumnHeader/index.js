import React from 'react';
import { Menu, Dropdown, Button, Input } from 'antd';
import {defaultSelection} from '../../../consts/defaultSelection';
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
                    selectedFilter: defaultSelection[columnDataType[dataIndex]],
                    condition: 'or',
                    textInput: ''
                }])
                setShowFilter()
                break;
            }
            case 'sortAscending': {
                console.log('inSortAscendingCase', sorterArr);
                let temp = [...sorterArr];
                console.log('temp', temp);
                let isColumnFound = false
                temp = temp.map(obj => {
                    if (obj['column'] === dataIndex) {
                        isColumnFound = true;
                        obj['order'] = 'ascending'
                    }
                    return obj;
                });
                console.log('isColumnFound', isColumnFound);
                if (!isColumnFound) {
                    const id = uuidv4();
                    temp = [...sorterArr, { id, column: dataIndex, order: 'ascending' }]
                }
                console.log('finalTemp', temp);
                setSorterArrProperties(temp)
                setShowSorter();
                break;
            }
            case 'sortDescending':
                let temp = [...sorterArr];
                let isColumnFound = false
                temp = temp.map(obj => {
                    if (obj['column'] === dataIndex) {
                        isColumnFound = true;
                        obj['order'] = 'descending'
                    }
                    return obj;
                });
                console.log('isColumnFound', isColumnFound);
                if (!isColumnFound) {
                    const id = uuidv4();
                    temp = [...sorterArr, { id, column: dataIndex, order: 'descending' }]
                }
                console.log('finalTemp', temp);
                setSorterArrProperties(temp)
                setShowSorter();
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
            <Dropdown overlay={menu()} trigger={['click']} >
                <div>{title}</div>
            </Dropdown>
        </React.Fragment>
    )
}
export default CustomTableColumnHeader;