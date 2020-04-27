import React, { useState, useEffect } from 'react';
import { Popover, Select, Input, Tooltip } from 'antd';
import { PlusOutlined, CloseOutlined, DragOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import ReactDragListView from 'react-drag-listview'
import * as s from './styles';

const { Option } = Select;

function FilterAction(props) {
    const columns = props.columns;
    const columnDataType = props.columnDataType;
    console.log('propspropsprops', props);
    console.log('filterfilter', props.showFilter);
    console.log('columnDataType', columnDataType);


    const handleChange = (id, type) => (event) => {
        const tempFilters = [...props.filterArr];
        if (type === 'textInput') {
            tempFilters.find(sortObj => sortObj.id === id).type = event.target.value;
        }
        else {
            tempFilters.find(sortObj => sortObj.id === id).type = event;
        }
        console.log('clicked', id, event);
    }

    const handleRemove = (id) => {
        props.setFilterArrProperties((props.filterArr.filter(sortObj => sortObj.id !== id)));
    }

    const renderFilter = ({ id, column, filters, condition }, index) => {
        const lessThan = "<";
        const lessThanEqualTo = "<=";
        return (
            <div className="single-filter-div" style={{ display: 'flex', alignItems: 'center', margin: '3px', width: '100%' }} id={id}>
                <div className='drag-outlined-icon' style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DragOutlined />
                </div>
                <div style={{ display: 'flex', flex: '1 1 auto', minWidth: '0px', margin: '0px 8px 0px 8px' }}>
                    {index !== 0 &&
                        <div className='filter-boolean-condition' style={{ margin: '0px 8px 0px 0px ' }}>
                            <Select defaultValue={condition} onChange={handleChange(id, 'condition')}>
                                <Option value="and">And</Option>
                                <Option value="or">Or</Option>
                            </Select>
                        </div>
                    }
                    <div className="filter-column-options" style={{ margin: '0px 8px 0px 0px' }}>
                        <Select defaultValue={column} onChange={handleChange(id, 'column')}>
                            {columns.map(col => (
                                <Option value={col.dataIndex}>{col.title}</Option>
                            ))}
                        </Select>
                    </div>

                    <div className="filter-options" style={{ margin: '0px 8px 0px 0px' }}>
                        {columnDataType[column] === 'text' &&
                            <Select defaultValue={filters} onChange={handleChange(id, 'filters')}>
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
                            <Select defaultValue={filters} onChange={handleChange(id, 'filters')}>
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
        props.setFilterArrProperties([...props.filterArr,
        {
            id,
            column: 'column1',
            filters: 'contains',
            condition: 'and',
            textInput: ''
        }
        ])
    }

    const getAddFilterButton = () => {
        return (
            <div role="button" style={{ display: 'flex', cursor: 'pointer' }} onClick={handleAddInFilterArr()}>
                <div><PlusOutlined /></div>
                <div>Add a Filter</div>
            </div>
        )
    }


    const getFilterPopover = () => {
        const dragProps = {
            onDragEnd(fromIndex, toIndex) {
                console.log('helloiamhere', fromIndex, toIndex);
                const item = props.filterArr.splice(fromIndex, 1);
                props.filterArr.splice(toIndex, 0, item);
                props.setFilterArrProperties(props.filterArr);
            },
            nodeSelector: '.single-filter-div',
            handleSelector: '.drag-outlined-icon'
        };
        return (
            <div key="43">
                <div className='sort-overlay-root' style={{ display: 'flex', flexDirection: 'column' }}>
                    <ReactDragListView {...dragProps}>
                        {props.filterArr.map((filterObj, index) => renderFilter(filterObj, index))}
                    </ReactDragListView>
                </div>
                {getAddFilterButton()}
            </div>
        )
    }
    return (
        <div className={s.filterRoot}>

            <Popover visible={props.showFilter} trigger="click" placement="bottom" content={getFilterPopover()} overlayStyle={{ overflow: 'hidden auto', maxHeight: '250px' }}>
                <div role="button" className="table-header-sort-button-text" onClick={() => props.setShowFilter()}>
                    Filter
                </div>
            </Popover>
        </div>
    )
}
export default FilterAction;