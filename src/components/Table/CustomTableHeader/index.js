import React, { useState } from 'react';
import { Button } from 'antd';


function CustomTableHeader(props) {
    const [columnPropertyName, setColumnPropertyName] = useState("");
    const handleClick = () => {
        console.log("hello")
    }

    return (
        <React.Fragment>
            <div>smit</div>
        </React.Fragment>
    )
}
export default CustomTableHeader;