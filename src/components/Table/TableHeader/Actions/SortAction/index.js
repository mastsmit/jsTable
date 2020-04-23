import React, { useState } from 'react';
import { Popover, Select, Button } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

function SortAction(props) {
    const [addSort, setAddSort] = useState([]);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const handlePopoverVisibility = () => {
        setIsPopoverVisible(true);
    }

    const handleChange = (value) => {
        console.log('clicked', value);
    }
    const handleRemove = (index) => () => {
        console.log('index', index);
    }

    const handleAddSort = (Index) => () => {
        const elem = (
            <div style={{ display: 'flex' }}>
                <div>
                    <Select defaultValue="ascending" onChange={handleChange}>
                        <Option value="ascending">Ascending</Option>
                        <Option value="descending">Descending</Option>
                    </Select>
                </div>
                <div>
                    <Select defaultValue="ascending" onChange={handleChange}>
                        <Option value="ascending">Ascending</Option>
                        <Option value="descending">Descending</Option>
                    </Select>
                </div>
                <div role="button" onClick={handleRemove(Index)} style={{ cursor: 'pointer' }}>
                    <CloseOutlined />
                </div>
            </div>)
        setAddSort([...addSort, elem]);
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
        console.log('addSort', addSort);
        return (
            <div>
                <div className='sort-overlay-root' style={{ display: 'flex', flexDirection: 'column' }}>
                    {addSort.map(sort => (
                        sort
                    ))}
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