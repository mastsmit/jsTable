import React from 'react';
import { Menu, Dropdown } from 'antd';
import { defaultSelection } from '../../../consts/defaultSelection';
import { v4 as uuidv4 } from 'uuid';
import {
    FilterOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
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
    colors,
    setShowSorter }) {

    const handleClick = (dataIndex) => (e) => {
        switch (e.key) {
            case 'addFilter': {
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
                let temp = [...sorterArr];
                let isColumnFound = false
                temp = temp.map(obj => {
                    if (obj['column'] === dataIndex) {
                        isColumnFound = true;
                        obj['order'] = 'ascending'
                    }
                    return obj;
                });
                if (!isColumnFound) {
                    const id = uuidv4();
                    temp = [...sorterArr, { id, column: dataIndex, order: 'ascending' }]
                }
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
                if (!isColumnFound) {
                    const id = uuidv4();
                    temp = [...sorterArr, { id, column: dataIndex, order: 'descending' }]
                }
                setSorterArrProperties(temp)
                setShowSorter();
                break;
            default:
                return
        }
    }


    const menu = () => {
        const data = [
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
        ];
        return (
            <div className={s.dropDownStyles(colors)}>{
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
            <Dropdown overlay={menu()} trigger={['click']} placement="bottomCenter">
                <div style={{ cursor: 'pointer' }}>{title}</div>
            </Dropdown>
        </React.Fragment>
    )
}
export default CustomTableColumnHeader;