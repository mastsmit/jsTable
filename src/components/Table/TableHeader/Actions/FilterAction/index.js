import React from 'react';
import debounce from 'lodash/debounce';
import { Popover, Select, Input, Tooltip, DatePicker } from 'antd';
import c from 'classnames';
import { PlusOutlined, CloseOutlined, DragOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { defaultSelection } from '../../../../../consts/defaultSelection';
import ReactDragListView from 'react-drag-listview';
import * as s from '../../styles';
import { lineClassName } from '../../../styles';
const { Option } = Select;
const { RangePicker } = DatePicker;
function FilterAction({
    columns,
    columnDataType,
    filterArr,
    showFilter,
    setShowFilter,
    colors,
    setFilterArrProperties,
}) {

    const handleChange = (id, type) => (event) => {
        let tempFilters = [...filterArr];
        if (type === 'column') {
            const tempObj = tempFilters.find(filterObj => filterObj.id === id);
            tempObj[type] = event;
            tempObj.selectedFilter = defaultSelection[columnDataType[event]];
        }
        else {
            tempFilters.find(filterObj => filterObj.id === id)[type] = event;
        }

        setFilterArrProperties(tempFilters)
    }

    const handleDateChange = (id, filterType) => (dates, dateString) => {
        let tempFilters = [...filterArr];
        const tempObj = tempFilters.find(filterObj => filterObj.id === id);
        if (filterType === 'range') {
            tempObj['fromString'] = dateString ? dateString[0] : undefined;
            tempObj['toString'] = dateString ? dateString[1] : undefined;
        }
        else {
            tempObj['dateString'] = dateString ? dateString : undefined;
        }
        console.log('vadsafsa', tempObj)
        setFilterArrProperties(tempFilters)

    }


    const handleRemove = (id) => {
        setFilterArrProperties((filterArr.filter(filterObj => filterObj.id !== id)));
    }

    const renderFilter = ({ id, column, selectedFilter, condition, textInput }, index) => {
        const lessThan = "<";
        const lessThanEqualTo = "<=";
        const handleInputChangeDebounce = debounce(handleChange(id, 'textInput'), 300);
        return (
            <div className={c('single-filter-div-wrapper', s.headerDropdown(colors))} id={id}>
                <div className='drag-outlined-icon'>
                    <DragOutlined />
                </div>
                <div className='single-filter-wrapper'>
                    {(index !== 0) &&
                        <div className='filter-boolean-condition'>
                            <Select dropdownClassName={s.style1(colors)} value={condition} defaultValue={condition} disabled={index > 1} onChange={handleChange(id, 'condition')}>
                                <Option value="and">And</Option>
                                <Option value="or">Or</Option>
                            </Select>
                        </div>
                    }
                    <div className="filter-column-options">
                        <Select dropdownClassName={s.style1(colors)} value={column} defaultValue={column} onChange={handleChange(id, 'column')}>
                            {columns.map(col => (
                                <Option key={col.dataIndex} value={col.dataIndex}>{col.titleString}</Option>
                            ))}
                        </Select>
                    </div>

                    <div className="filter-options">
                        {columnDataType[column] === 'text' &&
                            <Select dropdownClassName={s.style1(colors)} value={selectedFilter} defaultValue="contains" onChange={handleChange(id, 'selectedFilter')}>
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
                            <Select dropdownClassName={s.style1(colors)} value={selectedFilter} defaultValue='equalTo' onChange={handleChange(id, 'selectedFilter')}>
                                <Option value="equalTo"> = </Option>
                                <Option value="isNotEqualTo"> != </Option>
                                <Option value="greaterThan"> > </Option>
                                <Option value="lessThan">{lessThan} </Option>
                                <Option value="greaterThanEqualTo">>=</Option>
                                <Option value="lessThanEqualTo">{lessThanEqualTo}</Option>
                            </Select>
                        }
                        {
                            columnDataType[column] === 'date' &&
                            <Select dropdownClassName={s.style1(colors)} value={selectedFilter} defaultValue='range' onChange={handleChange(id, 'selectedFilter')}>
                                <Option value="matchDate"> Is</Option>
                                <Option value="range">Between</Option>
                            </Select>
                        }
                    </div>
                    {
                        ((columnDataType[column] === 'date' && selectedFilter === 'range' && (
                            <RangePicker className="range-picker" dropdownClassName={s.style1(colors)} onChange={handleDateChange(id, 'range')} />)))
                    }
                    {
                        ((columnDataType[column] === 'date' && selectedFilter === 'matchDate' && (
                            <DatePicker className="date-picker" dropdownClassName={s.style1(colors)} onChange={handleDateChange(id, 'single')} />)))

                    }
                    {
                        (columnDataType[column] !== 'date') && (
                            <div className="filter-text-input">
                                <Input value={textInput} id={id} placeholder="value" onChange={(e) => {
                                    handleInputChangeDebounce(e.target.value)
                                }} />
                            </div>
                        )
                    }
                </div>
                <div role="button" onClick={() => handleRemove(id)} style={{ cursor: 'pointer', margin: '0px 10px 0px auto', minWidth: '0px' }}>
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
            textInput: '',
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
                const temp = [...filterArr]
                const item = temp.splice(fromIndex, 1)[0];
                temp.splice(toIndex, 0, item);
                console.log('filterArr', temp);
                setFilterArrProperties(temp);
            },
            nodeSelector: '.single-filter-div-wrapper',
            handleSelector: '.drag-outlined-icon'
        };
        return (
            <div key="43">
                <div className='filter-overlay-root' style={{ display: 'flex', flexDirection: 'column' }}>
                    <ReactDragListView {...dragProps} lineClassName={lineClassName()}>
                        {filterArr.map((filterObj, index) => renderFilter(filterObj, index))}
                    </ReactDragListView>
                </div>
                {getAddFilterButton()}
            </div>
        )
    }
    return (
        <div>
            <Popover key="filter-action-popover" overlayClassName={s.popOverstyle(colors)} onVisibleChange={(e) => { setShowFilter(e) }} visible={showFilter} trigger="click" placement="bottom" content={getFilterPopover()} overlayStyle={{ overflow: 'hidden auto', maxHeight: '250px' }}>
                <div role="button" className="table-header-filter-button-text" onClick={() => { setShowFilter() }}>
                    Filter
                </div>
            </Popover>
        </div>
    )
}
export default FilterAction;