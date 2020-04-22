import React from 'react';
import RowTableActions from '../RowTableActions';
import CustomTableHeader from '../CustomTableHeader';
export const getColumns = (props, onCell, addRow) => {
    return (
        [
            {
                width: 50,
                render: () => <RowTableActions handleAddRow={addRow} />
            },

            {
                title: () => <CustomTableHeader />,
                dataIndex: 'date',
                width: 200,
                onCell
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                width: 100,
            },
            {
                title: 'Type',
                dataIndex: 'type',
                width: 100,
            },
            {
                title: 'Note',
                dataIndex: 'note',
                width: 100,
            },
            {
                title: 'Action',
                key: 'action',
                render: () => <a>Delete</a>,
            },
        ]
    );
};