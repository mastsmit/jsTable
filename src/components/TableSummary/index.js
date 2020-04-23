import React, { useState, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function TableSummary(props) {
    const [menuItemArr, setMenuItemArr] = useState([]);
    const handleClick = (dataIndex) => (value) => {
        console.log('col', 'e', value);
        menuItemArr.find(item => item.dataIndex === dataIndex).summaryValue = value.key;
        setMenuItemArr([...menuItemArr])
    }

    // const handleMouseEnter = (dataIndex) => () => {
    //     console.log('dataIndex', dataIndex);
    // }


    // const handleMouseLeave = (dataIndex) => () => {
    //     console.log('dataIndex', dataIndex);
    // }

    useEffect(() => {
        setMenuItemArr(props.columns.map(col => {
            return {
                dataIndex: col.dataIndex,
                summaryValue: 'none'
            }
        }));
    }, [])

    const getSummaryDropdownItems = ({ dataIndex, summaryValue, pageData }) => {
        let isNumber = false;
        pageData.map(data => {
            if (typeof (data[dataIndex]) === 'number') {
                isNumber = true;
            }
            return 0;
        })
        return (
            isNumber ?
                <Menu selectedKeys={[summaryValue]} onClick={handleClick(dataIndex)} >
                    <Menu.Item key="none">None</Menu.Item>
                    <Menu.Item key="countAll">Count all</Menu.Item>
                    <Menu.Item key="countUniqueValues">Count unique values</Menu.Item>
                    <Menu.Item key="countEmpty">Count empty</Menu.Item>
                    <Menu.Item key="countNotEmpty">Connt not empty</Menu.Item>
                    <Menu.Item key='sum'>Sum</Menu.Item>
                    <Menu.Item key='min'>Min</Menu.Item>
                    <Menu.Item key='max'>Max</Menu.Item>
                </Menu>
                :
                <Menu selectedKeys={[summaryValue]} onClick={handleClick(dataIndex)} >
                    <Menu.Item key="none">None</Menu.Item>
                    <Menu.Item key="countAll">Count all</Menu.Item>
                    <Menu.Item key="countUniqueValues">Count unique values</Menu.Item>
                    <Menu.Item key="countEmpty">Count empty</Menu.Item>
                    <Menu.Item key="countNotEmpty">Connt not empty</Menu.Item>
                </Menu >
        )
    }

    const renderSummaryDetails = (dataIndex, summaryValue, pageData) => {
        let value = 0;
        console.log('pageData', pageData);
        switch (summaryValue) {
            case 'countAll':
                value = pageData.length;
                return `COUNT ${value}`

            case 'countEmpty':
                pageData.forEach(element => {
                    if (!element[dataIndex]) {
                        value = value + 1;
                    }
                });
                return `EMPTY ${value}`

            case 'countUniqueValues':
                const uniqueValues = []
                pageData.filter(element => {
                    if (element[dataIndex] && uniqueValues.indexOf(element[dataIndex]) !== 0) {
                        value = value + 1
                    }
                    uniqueValues.push(element[dataIndex]);
                })
                return `UNIQUE ${value}`

            case 'countNotEmpty':
                pageData.forEach(element => {
                    if (element[dataIndex]) {
                        value = value + 1;
                    }
                });
                return `NOT EMPTY ${value}`

            case 'sum':
                pageData.forEach(element => {
                    if (element[dataIndex]) {
                        value = value + element[dataIndex]
                    }
                })
                return `SUM ${value}`

            default:
                return 'Calculate';
        }
    }


    const renderSummaryDropdown = ({ dataIndex, summaryValue }, pageData) => {
        return (
            <Dropdown trigger="click" overlay={getSummaryDropdownItems({ dataIndex, summaryValue, pageData })}>
                <th
                    id={dataIndex}
                    className='table-summary'
                // onMouseEnter={handleMouseEnter(dataIndex)}
                // onMouseLeave={handleMouseLeave(dataIndex)}
                >
                    <div style={{ display: 'flex' }}>
                        <div>
                            {renderSummaryDetails(dataIndex, summaryValue, pageData)}
                        </div>
                        <div>
                            {summaryValue === 'none' && <DownOutlined />}
                        </div>
                    </div>
                </th>
            </Dropdown>
        )
    }
    return (
        <tr>
            {menuItemArr.map((menuItem, index) => (
                renderSummaryDropdown(menuItem, props.pageData)
            ))}
        </tr>
    )
}
export default TableSummary;