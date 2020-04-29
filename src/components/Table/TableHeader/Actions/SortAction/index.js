import React, { useState } from 'react';
import { Popover, Select, Tooltip } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined, CloseOutlined, DragOutlined } from '@ant-design/icons';
import ReactDragListView from 'react-drag-listview'
import * as s from '../../styles';


const { Option } = Select;

function SortAction(props) {
    const [sorterArr, setSorterArr] = useState([]);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const columns = props.columns;
    const handlePopoverVisibility = () => {
        setIsPopoverVisible(true);
    }

    const handleChange = (id, type) => (value) => {
        const tempSorters = [...sorterArr];
        tempSorters.find(sortObj => sortObj.id === id).type = value;
        console.log('clicked', id, value);
    }
    const handleRemove = (id) => {
        console.log('id------------', id, sorterArr.filter(sortObj => sortObj.id !== id))
        setSorterArr(sorterArr.filter(sortObj => sortObj.id !== id));
    }

    const renderSort = ({ id, column, order }) => {

        return (

            <div className="single-sorter-div" className={s.singlesorterDiv}  id={id}>
                <div className="drag-outlined-icon">
                    <DragOutlined />
                </div>
                <div >
                    <Select
                        defaultValue={column}
                        onChange={handleChange(id, 'column')}
                    // dropdownStyle={{ backgroundColor: '#3f4447' }}
                    // defaultOpen={true}
                    >
                        {columns.map(col => (
                            <Option value={col.dataIndex}>{col.title}</Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select defaultValue={order} onChange={handleChange(id, 'order')}>
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

    const handleAddSort = () => () => {
        const id = uuidv4();
        setSorterArr([...sorterArr, {
            id,
            order: 'ascending',
            column: 'date'
        }]);
    }
    const getAddSortButton = () => {
        return (
            <div role="button" style={{ display: 'flex', cursor: 'pointer' }} onClick={handleAddSort()}>
                <div><PlusOutlined /></div>
                <div>Add a sort</div>
            </div>
        )
    }
    const getSortPopover = () => {

        const dragProps = {
            onDragEnd(fromIndex, toIndex) {
                console.log('helloiamhere', fromIndex, toIndex);
                const item = sorterArr.splice(fromIndex, 1)[0];
                sorterArr.splice(toIndex, 0, item);
                setSorterArr(sorterArr);
            },
            nodeSelector: '.single-sorter-div',
            handleSelector: '.drag-outlined-icon'
        };
        console.log('addSort', sorterArr);
        return (
            <div>
                <div className='sort-overlay-root' style={{ display: 'flex', flexDirection: 'column' }}>
                    <ReactDragListView {...dragProps}>
                        {sorterArr.map((sortObj) => renderSort(sortObj, columns))}
                    </ReactDragListView>
                </div>
                {getAddSortButton()}
            </div>
        )
    }
    return (
        <React.Fragment>
            <Popover overlayClassName={s.popOverstyle} trigger="click" placement="bottom" content={getSortPopover()}>
                <div onClick={handlePopoverVisibility} role="button" className="table-header-sort-button-text">
                    Sort
                    </div>
            </Popover>
        </React.Fragment>
    )
}
export default SortAction;