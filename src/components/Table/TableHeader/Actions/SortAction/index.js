import React, { useState } from 'react';
import { Popover, Select, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined, CloseOutlined, DragOutlined } from '@ant-design/icons';
import ReactDragListView from 'react-drag-listview'
import * as s from '../../styles';


const { Option } = Select;

function SortAction({
    columns,
    showSorter,
    colors,
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
            <div className={s.headerDropdown(colors)} id={id}>
                <div className="drag-outlined-icon" style={{ marginRight: '8px' }}>
                    <DragOutlined />
                </div>
                <div className='sorter-column-options'>
                    <Select
                        dropdownClassName={s.style1(colors)}
                        value={column}
                        defaultValue={column}
                        onChange={handleChange(id, 'column')}
                    >
                        {columns.map(col => (
                            <Option value={col.dataIndex}>{col.titleString}</Option>
                        ))}
                    </Select>
                </div>
                <div style={{ margin: '0px 8px 0px 0px ' }}>
                    <Select dropdownClassName={s.style1(colors)} value={order} defaultValue={order} onChange={handleChange(id, 'order')}>
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
            <div className={s.addButtonStyle(colors)} role="button" style={{ display: 'flex', cursor: 'pointer' }} onClick={handleAddInSorterArr()}>
                <div><PlusOutlined /></div>
                <div style={{ paddingLeft: "8px" }}>Add a sort</div>
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
            <Popover overlayClassName={s.popOverstyle(colors)} onVisibleChange={(e) => setShowSorter(e)} visible={showSorter} trigger="click" placement="bottom" content={getSortPopover()}>
                <div role="button" className="table-header-sort-button-text" onClick={() => { setShowSorter() }} >
                    Sort
                    </div>
            </Popover>
        </React.Fragment>
    )
}
export default SortAction;