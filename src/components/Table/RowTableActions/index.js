import React, { useState } from 'react';
import { Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function RowTableActions(props) {
    const title = props.isFromColumn ? "Click To Add A New Column" : "Click to add a block below";
    return (
        <div>
            <Tooltip title={title} placement="bottom">
                <Button type="default" icon={<PlusOutlined />} onClick={props.handleAdd} />
            </Tooltip>
        </div>
    )
}
export default RowTableActions;