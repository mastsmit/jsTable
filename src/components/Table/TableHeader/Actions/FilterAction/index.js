import React, { useState } from 'react';
import { Popover, Select, Input, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

function FilterAction(props) {
    const [filterArr, setFilterArr] = useState([]);
    const columns = props.columns;
    const columnDataType = props.columnDataType;
    console.log('columnDataType', columnDataType);
    const handleChange = (id, type) => (event) => {
        const tempSorters = [...filterArr];
        if (type === 'textInput') {
            tempSorters.find(sortObj => sortObj.id === id).type = event.target.value;
        }
        else {
            tempSorters.find(sortObj => sortObj.id === id).type = event;
        }
        console.log('clicked', id, event);
    }

    const handleRemove = (id) => {
        console.log('id------------', id, filterArr.filter(sortObj => sortObj.id !== id))
        setFilterArr(filterArr.filter(sortObj => sortObj.id !== id));
    }

    const renderFilter = ({ id, column, filters, condition }, index) => {
        const lessThan = "<";
        const lessThanEqualTo = "<=";
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3px' }} id={id}>
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
                <div role="button" onClick={() => handleRemove(id)} style={{ cursor: 'pointer', margin: '0px 0px 0px 8px' }}>
                    <Tooltip title="Remove filter rule">
                        <CloseOutlined />
                    </Tooltip>
                </div>
            </div>
        )
    }

    const handleFilterSort = () => () => {
        const id = uuidv4();
        setFilterArr([...filterArr, {
            id,
            column: 'column1',
            filters: 'contains',
            condition: 'and',
            textInput: ''
        }]);
    }

    const getAddFilterButton = () => {
        return (
            <div role="button" style={{ display: 'flex', cursor: 'pointer' }} onClick={handleFilterSort()}>
                <div><PlusOutlined /></div>
                <div>Add a Filter</div>
            </div>
        )
    }


    const getFilterPopover = () => {
        return (
            <div>
                <div className='sort-overlay-root' style={{ display: 'flex', flexDirection: 'column' }}>
                    {filterArr.map((sortObj, index) => renderFilter(sortObj, index))}
                </div>
                {getAddFilterButton()}
            </div>
        )
    }
    return (
        <React.Fragment>
            <Popover trigger="click" placement="bottom" content={getFilterPopover()}>
                <div role="button" className="table-header-sort-button-text">
                    Filter
                </div>
            </Popover>
        </React.Fragment>
    )
}
export default FilterAction;