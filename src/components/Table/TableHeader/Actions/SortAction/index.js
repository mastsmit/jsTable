import React, { useState } from 'react';
import { Popover, Select, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

function SortAction(props) {
    const [sorterArr, setSorterArr] = useState([]);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

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
            <div style={{ display: 'flex' }} id={id}>
                <div>
                    <Select defaultValue={column} onChange={handleChange(id, 'column')}>
                        <Option value="v">v</Option>
                        <Option value="s">s</Option>
                        <Option value="u">u</Option>
                    </Select>
                </div>
                <div>
                    <Select defaultValue={order} onChange={handleChange(id, 'order')}>
                        <Option value="ascending">Ascending</Option>
                        <Option value="descending">Descending</Option>
                    </Select>
                </div>
                <div role="button" onClick={() => handleRemove(id)} style={{ cursor: 'pointer' }}>
                    <CloseOutlined />
                </div>
            </div>
        )
    }

    const handleAddSort = () => () => {
        const id = uuidv4();
        setSorterArr([...sorterArr, {
            id,
            order: 'ascending',
            column: 's'
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
        // if (addSort.length === 0) {
        //     return (
        //         getAddSortButton()
        //     )
        // }
        console.log('addSort', sorterArr);
        return (
            <div>
                <div className='sort-overlay-root' style={{ display: 'flex', flexDirection: 'column' }}>
                    {sorterArr.map((sortObj) => renderSort(sortObj))}
                </div>
                {getAddSortButton()}
            </div>
        )
    }
    return (
        <React.Fragment>
            <Popover trigger="click" placement="bottom" content={getSortPopover()}>
                <div onClick={handlePopoverVisibility} role="button" className="table-header-sort-button-text">
                    Sort
                    </div>
            </Popover>
        </React.Fragment>
    )
}
export default SortAction;