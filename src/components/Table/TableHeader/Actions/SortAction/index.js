import React, { useState } from 'react';
import { Popover, Select, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined, CloseOutlined, DragOutlined } from '@ant-design/icons';
import ReactDragListView from 'react-drag-listview'


const { Option } = Select;

function SortAction({
    columns,
    showSorter,
    setShowSorter,
    sorterArr,
    setSorterArrProperties
}) {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const handlePopoverVisibility = () => {
        setIsPopoverVisible(true);
    }

    const handleChange = (id, type) => (value) => {
        const tempSorters = [...sorterArr];
        tempSorters.find(sortObj => sortObj.id === id)[type] = value;
        setSorterArrProperties(tempSorters);
        console.log('clicked', id, value);
    }

    const handleRemove = (id) => {
        console.log('id------------', id, sorterArr.filter(sortObj => sortObj.id !== id))
        setSorterArrProperties((sorterArr.filter(sortObj => sortObj.id !== id)));
    }

    const renderSort = ({ id, column, order }) => {

        return (

            <div className="single-sorter-div" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3px' }} id={id}>
                <div className="drag-outlined-icon" style={{ margin: '0px 8px 0px 0px' }}>
                    <DragOutlined />
                </div>
                <div style={{ margin: '0px 8px 0px 0px ' }}>
                    <Select
                        value={column}
                        defaultValue={column}
                        onChange={handleChange(id, 'column')}
                    // dropdownStyle={{ backgroundColor: '#3f4447' }}
                    // defaultOpen={true}
                    >
                        {columns.map(col => (
                            <Option value={col.dataIndex}>{col.titleString}</Option>
                        ))}
                    </Select>
                </div>
                <div style={{ margin: '0px 8px 0px 0px ' }}>
                    <Select value={order} defaultValue={order} onChange={handleChange(id, 'order')}>
                        <Option value="ascending">Ascending</Option>
                        <Option value="descending">Descending</Option>
                    </Select>
                </div>
                <div role="button" onClick={() => handleRemove(id)} style={{ cursor: 'pointer', margin: '0px 0px 0px 8px' }}>
                    <Tooltip title="Remove sort rule">
                        <CloseOutlined />
                    </Tooltip>
                </div>
            </div>

        )
    }

    const handleAddInSorterArr = () => () => {
        const id = uuidv4();
        let column = ''
        if (columns.length > 0) {
            column = columns[0].dataIndex;
        }
        setSorterArrProperties([...sorterArr, {
            id,
            order: 'ascending',
            column
        }]);
    }

    const getAddSortButton = () => {
        return (
            <div role="button" style={{ display: 'flex', cursor: 'pointer' }} onClick={handleAddInSorterArr()}>
                <div><PlusOutlined /></div>
                <div>Add a sort</div>
            </div>
        )
    }
    const getSortPopover = () => {
        const dragProps = {
            onDragEnd(fromIndex, toIndex) {
                console.log('helloiamhere', fromIndex, toIndex);
                const tempArr = [...sorterArr]
                console.log('tempArr', tempArr);
                const item = sorterArr.splice(fromIndex, 1)[0];
                sorterArr.splice(toIndex, 0, item);
                setSorterArrProperties(tempArr);
            },
            nodeSelector: '.single-sorter-div',
            handleSelector: '.drag-outlined-icon'
        };
        console.log('addSort', sorterArr);
        return (
            <div>
                <div className='sort-overlay-root' style={{ display: 'flex', flexDirection: 'column' }}>
                    <ReactDragListView {...dragProps}>
                        {sorterArr.map((sortObj) => renderSort(sortObj))}
                    </ReactDragListView>
                </div>
                {getAddSortButton()}
            </div>
        )
    }
    return (
        <React.Fragment>
            <Popover visible={showSorter} trigger="click" placement="bottom" content={getSortPopover()}>
                <div role="button" className="table-header-sort-button-text" onClick={() => setShowSorter()}>
                    Sort
                    </div>
            </Popover>
        </React.Fragment>
    )
}
export default SortAction;