import React, { useState, useEffect } from 'react';
import { Dropdown, Menu } from 'antd';
import c from 'classnames';
import { DownOutlined } from '@ant-design/icons';
import * as s from './styles';
import { dropDownStyles } from '../Table/styles'

function TableSummary({
    colors,
    pageData,
    columnDataType,
    columns
}) {
    const [selectedSummaryKey, setSelectedSummaryKey] = useState({});
    const handleClick = (dataIndex) => (value) => {
        const temp = { ...selectedSummaryKey };
        temp[dataIndex] = value.key;
        setSelectedSummaryKey(temp);
    }
    useEffect(() => {
        const temp = {};
        columns.forEach(col => temp[col.dataIndex] = 'none')
        setSelectedSummaryKey(temp);
    }, [])




    const getSummaryDropdownItems = ({ dataIndex, summaryValue, columnDataType, colors }) => {
        switch (columnDataType[dataIndex] ? columnDataType[dataIndex] : 'none') {
            case 'text':
                return (<div className={dropDownStyles(colors)}><Menu selectedKeys={[summaryValue]} onClick={handleClick(dataIndex)} >
                    <Menu.Item key="none">None</Menu.Item>
                    <Menu.Item key="countAll">Count all</Menu.Item>
                    <Menu.Item key="countUniqueValues">Count unique values</Menu.Item>
                    <Menu.Item key="countEmpty">Count empty</Menu.Item>
                    <Menu.Item key="countNotEmpty">Count not empty</Menu.Item>
                </Menu ></div>)
            case 'number':
                return (<div className={dropDownStyles(colors)}>
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
                    </Menu ></div>
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
                const uniqueValues = {}

                pageData.filter(element => {
                    if (element[dataIndex] && uniqueValues[(element[dataIndex])] !== 1) {
                        value = value + 1
                    }
                    uniqueValues[element[dataIndex]] = 1;
                })
                return `UNIQUE ${Object.keys(uniqueValues).length}`

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
                return `AVERAGE ${Number(value).toFixed(2)}`
            case 'median':
                let arr = [], sortedArr = [], lengthOfArr;
                pageData.forEach(element => {
                    if (element[dataIndex]) {
                        arr.push(element[dataIndex])
                    }
                })
                sortedArr = arr.sort();
                lengthOfArr = sortedArr.length;
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
                            isFirstIndex = false
                        }
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
                        isFirstIndex = false

                    }
                })
                return `MAX ${max}`;
            default:
                return 'Calculate';
        }
    }


    const renderSummaryDropdown = ({ dataIndex }, pageData, columnDataType, index, colors) => {
        const summaryValue = selectedSummaryKey[dataIndex];
        return (
            <Dropdown key={dataIndex} trigger="click" overlay={getSummaryDropdownItems({ dataIndex, summaryValue, columnDataType, colors })} placement="topCenter">
                <th
                    className={c(s.tableSummary(colors), index === 0 ? "ant-table-cell ant-table-cell-fix-left ant-table-cell-fix-left-last" : 'ant-table-cell')}
                    style={index === 0 ? { left: '0px' } : {}}
                >
                    <div className="main-div">
                        <div className="a">
                            <div style={{ display: 'flex' }}>
                                <div>
                                    {renderSummaryDetails(dataIndex, summaryValue, pageData)}
                                </div>
                                <div className='b'>
                                    {summaryValue === 'none' && <DownOutlined />}
                                </div>
                            </div>
                        </div>
                    </div>
                </th>
            </Dropdown>
        )
    }

    return (
        <tr>
            {
                columns.map((menuItem, index) => (
                    renderSummaryDropdown(menuItem, pageData, columnDataType, index, colors)
                ))
            }
        </tr>
    )
}
export default TableSummary;