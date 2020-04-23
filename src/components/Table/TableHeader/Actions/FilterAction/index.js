import React, { useState } from 'react';
import { Popover, Select, Input, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

function FilterAction(props) {
    const [filterArr, setFilterArr] = useState([]);
    const columns = props.columns;

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
        return (
            <div style={{ display: 'flex' }} id={id}>
                {index !== 0 &&
                    <div>
                        <Select defaultValue={condition} onChange={handleChange(id, 'condition')}>
                            <Option value="and">And</Option>
                            <Option value="or">Or</Option>
                        </Select>
                    </div>
                }
                <div>
                    <Select defaultValue={column} onChange={handleChange(id, 'column')}>
                        {columns.map(col => (
                            <Option value={col.dataIndex}>{col.title}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select defaultValue={filters} onChange={handleChange(id, 'filters')}>
                        <Option value="contains">Contains</Option>
                        <Option value="is">Is</Option>
                        <Option value="isNot">Is not</Option>
                        <Option value="doesNotContain">Does not contain</Option>
                        <Option value="isEmpty">Is empty</Option>
                        <Option value="isNotEmpty">Is not empty</Option>
                    </Select>
                </div>
                <div>
                    <Input id={id} placeholder="value" onChange={handleChange(id, 'textInput')} />
                </div>
                <div role="button" onClick={() => handleRemove(id)} style={{ cursor: 'pointer' }}>
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
            column: 'date',
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