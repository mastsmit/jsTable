import React, { useState } from 'react';
import { Button } from 'antd';


function CustomTableHeader(props) {
    const [columnPropertyName, setColumnPropertyName] = useState("");
    const handleClick = () => {
        console.log("hello")
    }

    return (
        <React.Fragment>
            <div onClick={() => console.log('fdafdsa')} style={{ padding: '16px' }}>
                <div>smit</div>
            </div>
        </React.Fragment>
    )
}
export default CustomTableHeader;