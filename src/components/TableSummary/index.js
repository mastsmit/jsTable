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

    useEffect(() => {
        setMenuItemArr(props.columns.map(col => {
            return {
                dataIndex: col.dataIndex,
                summaryValue: 'none'
            }
        }));
    }, [])


    const getSummaryDropdownItems = ({ dataIndex, summaryValue, columnDataType }) => {
        switch (columnDataType[dataIndex]) {
            case 'text':
                return (<Menu selectedKeys={[summaryValue]} onClick={handleClick(dataIndex)} >
                    <Menu.Item key="none">None</Menu.Item>
                    <Menu.Item key="countAll">Count all</Menu.Item>
                    <Menu.Item key="countUniqueValues">Count unique values</Menu.Item>
                    <Menu.Item key="countEmpty">Count empty</Menu.Item>
                    <Menu.Item key="countNotEmpty">Count not empty</Menu.Item>
                </Menu >)
            case 'number':
                return (
                    <Menu selectedKeys={[summaryValue]} onClick={handleClick(dataIndex)} >
                        <Menu.Item key="none">None</Menu.Item>
                        <Menu.Item key="countAll">Count all</Menu.Item>
                        <Menu.Item key="countUniqueValues">Count unique values</Menu.Item>
                        <Menu.Item key="countEmpty">Count empty</Menu.Item>
                        <Menu.Item key="countNotEmpty">Count not empty</Menu.Item>
                        <Menu.Item key="sum">Sum</Menu.Item>
                        <Menu.Item key="average">Average</Menu.Item>
                        <Menu.Item key="median">Median</Menu.Item>
                        <Menu.Item key="min">Min</Menu.Item>
                        <Menu.Item key="max">Max</Menu.Item>
                    </Menu >
                )
            default:
                return
        }
    }
    const renderSummaryDetails = (dataIndex, summaryValue, pageData) => {
        let value = 0
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
                        value = value + element[dataIndex];
                    }
                })
                return `SUM ${value}`
            case 'average':
                let sum = 0, numbers = 0;
                pageData.forEach(element => {
                    if (element[dataIndex]) {
                        sum = sum + element[dataIndex];
                        numbers = numbers + 1
                    }
                })
                value = sum / numbers;
                return `AVERAGE ${value}`
            case 'median':
                let arr = [], sortedArr = [], lengthOfArr;
                pageData.forEach(element => {
                    if (element[dataIndex]) {
                        arr.push(element[dataIndex])
                    }
                })
                sortedArr = arr.sort();
                lengthOfArr = sortedArr.length;
                console.log('sortedarr', sortedArr);
                if (lengthOfArr % 2 === 0) return `MEDIAN ${(sortedArr[(lengthOfArr / 2)] + sortedArr[lengthOfArr / 2 - 1]) / 2}`
                else return `MEDIAN ${sortedArr[(lengthOfArr + 1) / 2]}`
            case 'min':
                {
                    let min;
                    let isFirstIndex = true;
                    pageData.forEach(element => {
                        if (element[dataIndex]) {
                            if (isFirstIndex) min = element[dataIndex]
                            else {
                                if (element[dataIndex] < min) min = element[dataIndex]
                            }
                        }
                        isFirstIndex = false
                    })
                    return `MIN ${min}`;
                }
            case 'max':
                let max;
                let isFirstIndex = true;
                pageData.forEach(element => {
                    if (element[dataIndex]) {
                        if (isFirstIndex) max = element[dataIndex]
                        else {
                            if (element[dataIndex] > max) max = element[dataIndex]
                        }
                    }
                    isFirstIndex = false
                })
                return `MAX ${max}`;
            default:
                return 'Calculate';
        }
    }


    const renderSummaryDropdown = ({ dataIndex, summaryValue }, pageData, columnDataType) => {
        return (
            <Dropdown key={dataIndex} trigger="click" overlay={getSummaryDropdownItems({ dataIndex, summaryValue, columnDataType })}>
                <th className='table-summary'>
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
                renderSummaryDropdown(menuItem, props.pageData, props.columnDataType)
            ))}
        </tr>
    )
}
export default TableSummary;