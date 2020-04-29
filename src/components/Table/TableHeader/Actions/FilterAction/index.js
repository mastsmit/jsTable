import React, { useState, useEffect } from 'react';
import { Popover, Select, Input, Tooltip } from 'antd';
import { PlusOutlined, CloseOutlined, DragOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { defaultSelection } from '../../../../../consts/defaultSelection';
import ReactDragListView from 'react-drag-listview'
import * as s from '../../styles';
const { Option } = Select;
function FilterAction({
    columns,
    columnDataType,
    filterArr,
    showFilter,
    setShowFilter,
    colors,
    setFilterArrProperties,
}) {
    // console.log('propspropsprops', props);
    // console.log('filterfilter', showFilter);
    // console.log('columnDataType', columnDataType);

    let length = filterArr.length;

    const handleChange = (id, type) => (event) => {
        let tempFilters = [...filterArr];
        console.log('fdafsadfdas', id, type)
        if (type === 'textInput') {
            tempFilters.find(filterObj => filterObj.id === id)[type] = event.target.value;
        } else if (type === 'column') {
            const tempObj = tempFilters.find(filterObj => filterObj.id === id);
            tempObj[type] = event;
            console.log('event, ', event, defaultSelection[columnDataType[event]])
            tempObj.selectedFilter = defaultSelection[columnDataType[event]];
        }
        else {
            tempFilters.find(filterObj => filterObj.id === id)[type] = event;
        }

        setFilterArrProperties(tempFilters)
        console.log('clicked', id, event);
    }

    const handleRemove = (id) => {
        setFilterArrProperties((filterArr.filter(filterObj => filterObj.id !== id)));
    }

    const renderFilter = ({ id, column, selectedFilter, condition }, index, conditionValue) => {
        const lessThan = "<";
        const lessThanEqualTo = "<=";

        return (
            <div className={s.headerDropdown(colors)} id={id}>
                <div className='drag-outlined-icon'>
                    <DragOutlined />
                </div>
                <div className='single-filter-wrapper'>
                    {(index !== 0) &&
                        <div className='filter-boolean-condition'>
                            <Select dropdownClassName={s.style1(colors)} defaultValue={condition} disabled={index > 1} onChange={handleChange(id, 'condition')} value={conditionValue}>
                                <Option value="and">And</Option>
                                <Option value="or">Or</Option>
                            </Select>
                        </div>
                    }
                    <div className="filter-column-options">
                        <Select dropdownClassName={s.style1(colors)} defaultValue={column} onChange={handleChange(id, 'column')}>
                            {columns.map(col => (
                                <Option value={col.dataIndex}>{col.titleString}</Option>
                            ))}
                        </Select>
                    </div>

                    <div className="filter-options">
                        {columnDataType[column] === 'text' &&
                            <Select dropdownClassName={s.style1(colors)} defaultValue="contains" onChange={handleChange(id, 'selectedFilter')}>
                                <Option value="contains">Contains</Option>
                                <Option value="is">Is</Option>
                                <Option value="isNot">Is not</Option>
                                <Option value="doesNotContain">Does not contain</Option>
                                <Option value="isEmpty">Is empty</Option>
                                <Option value="isNotEmpty">Is not empty</Option>
                            </Select>
                        }
                        {
                            columnDataType[column] === 'number' &&
                            <Select dropdownClassName={s.style1(colors)} defaultValue='equalTo' onChange={handleChange(id, 'selectedFilter')}>
                                <Option value="equalTo"> = </Option>
                                <Option value="isNotEqualTo"> != </Option>
                                <Option value="greaterThan"> > </Option>
                                <Option value="lessThan">{lessThan} </Option>
                                <Option value="greaterThanEqualTo">>=</Option>
                                <Option value="lessThanEqualTo">{lessThanEqualTo}</Option>
                            </Select>
                        }
                    </div>
                    <div className="filter-text-input">
                        <Input id={id} placeholder="value" onChange={handleChange(id, 'textInput')} />
                    </div>
                </div>
                <div role="button" onClick={() => handleRemove(id)} style={{ cursor: 'pointer', margin: '0px 0px 0px auto', minWidth: '0px' }}>
                    <Tooltip title="Remove filter rule">
                        <CloseOutlined />
                    </Tooltip>
                </div>
            </div>
        )
    }

    const handleAddInFilterArr = () => () => {
        const id = uuidv4();
        let column = ''
        if (columns.length > 0) {
            column = columns[0].dataIndex;
        }
        setFilterArrProperties([...filterArr,
        {
            id,
            column,
            selectedFilter: defaultSelection[columnDataType[column]],
            condition: 'or',
            textInput: ''
        }
        ])
    }

    const getAddFilterButton = () => {
        return (
            <div role="button" className={s.addButtonStyle(colors)} onClick={handleAddInFilterArr()}>
                <div><PlusOutlined /></div>
                <div style={{ paddingLeft: "8px" }}>Add a Filter</div>
            </div>
        )
    }


    const getFilterPopover = () => {
        const dragProps = {
            onDragEnd(fromIndex, toIndex) {
                console.log('helloiamhere', fromIndex, toIndex);
                const item = filterArr.splice(fromIndex, 1);
                filterArr.splice(toIndex, 0, item);
                setFilterArrProperties(filterArr);
            },
            nodeSelector: '.single-filter-div',
            handleSelector: '.drag-outlined-icon'
        };
        let conditionValue = null;
        if (filterArr.length === 1) conditionValue = filterArr[0]['condition']
        if (filterArr.length > 1) conditionValue = filterArr[1]['condition']
        return (
            <div key="43">
                <div className='filter-overlay-root' style={{ display: 'flex', flexDirection: 'column' }}>
                    <ReactDragListView {...dragProps}>
                        {filterArr.map((filterObj, index) => renderFilter(filterObj, index, conditionValue))}
                    </ReactDragListView>
                </div>
                {getAddFilterButton()}
            </div>
        )
    }
    return (
        <div>
            <Popover overlayClassName={s.popOverstyle(colors)} onVisibleChange={(e) => { setShowFilter(e) }} visible={showFilter} trigger="click" placement="bottom" content={getFilterPopover()} overlayStyle={{ overflow: 'hidden auto', maxHeight: '250px' }}>
                <div role="button" className="table-header-filter-button-text" onClick={() => { setShowFilter() }}>
                    Filter
                </div>
            </Popover>
        </div>
    )
}
export default FilterAction;