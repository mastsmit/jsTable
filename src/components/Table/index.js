import React, { Component, useContext, useState, useEffect, useRef } from 'react';
// import { getColumns } from './helpers/getColumns';
import RowTableActions from './RowTableActions';
import CustomTableHeader from './CustomTableHeader';
import EditableCell, { EditableRow } from './EditableCell';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import * as s from './styles';

// const EditableContext = React.createContext();

// const EditableRow = ({ index, ...props }) => {
//     const [form] = Form.useForm();
//     return (
//         <Form form={form} component={false}>
//             <EditableContext.Provider value={form}>
//                 <tr {...props} />
//             </EditableContext.Provider>
//         </Form>
//     );
// };

// const EditableCell = ({
//     title,
//     editable,
//     children,
//     dataIndex,
//     record,
//     handleSave,
//     ...restProps
// }) => {
//     const [editing, setEditing] = useState(false);
//     const inputRef = useRef();
//     const form = useContext(EditableContext);
//     useEffect(() => {
//         if (editing) {
//             inputRef.current.focus();
//         }
//     }, [editing]);

//     const toggleEdit = () => {
//         setEditing(!editing);
//         form.setFieldsValue({
//             [dataIndex]: record[dataIndex],
//         });
//     };

//     const save = async e => {
//         try {
//             const values = await form.validateFields();
//             toggleEdit();
//             handleSave({ ...record, ...values });
//         } catch (errInfo) {
//             console.log('Save failed:', errInfo);
//         }
//     };

//     let childNode = children;

//     if (editable) {
//         childNode = editing ? (
//             <Form.Item
//                 style={{
//                     margin: 0,
//                 }}
//                 name={dataIndex}
//                 rules={[
//                     {
//                         required: true,
//                         message: `${title} is required.`,
//                     },
//                 ]}
//             >
//                 <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//             </Form.Item>
//         ) : (
//                 <div
//                     className="editable-cell-value-wrap"
//                     style={{
//                         paddingRight: 24,
//                     }}
//                     onClick={toggleEdit}
//                 >
//                     {children}
//                 </div>
//             );
//     }

//     return <td {...restProps}>{childNode}</td>;
// };

class TableComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: 0,
                    date: '2018-02-11',
                    amount: 120,
                    type: 'income',
                    note: 'transfer',
                },
                {
                    key: 1,
                    date: '2018-03-11',
                    amount: 243,
                    type: 'income',
                    note: 'transfer',
                },
                {
                    key: 2,
                    date: '2018-04-11',
                    amount: 98,
                    type: 'income',
                    note: 'transfer',
                },
            ],
            columns: [
                {
                    width: 50,
                    render: () => <RowTableActions handleAdd={this.addRow} />
                },

                {
                    title: () => <CustomTableHeader />,
                    dataIndex: 'date',
                    width: 200,
                    editable: true
                },
                {
                    title: 'Amount',
                    dataIndex: 'amount',
                    width: 100,
                    editable: true
                },
                {
                    title: 'Type',
                    dataIndex: 'type',
                    width: 100,
                    editable: true
                },
                {
                    title: 'Note',
                    dataIndex: 'note',
                    width: 100,
                },
                {
                    title: () => <RowTableActions isFromColumn={true} handleAdd={this.addColumn} />,
                    key: 'action',
                },
            ],
            count: 3
        };
    }






    handleSave = row => {
        const newData = [...this.state.data];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            data: newData,
        });
    };

    addRow = (record, index) => {
        const { count, data } = this.state;
        const newData = { key: count, name: '', age: '', address: '' }
        this.setState({
            data: [...data, newData],
            count: count + 1
        })
    }

    addColumn = (record, index) => {
        console.log('index', index);
    }

    render() {
        const components = {
            body: {
                cell: () => <EditableCell />
            }
        }
        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            console.log('column', col);
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div className={s.rootTable}>
                <Table
                    bordered
                    rowClassName={() => 'editable-row'}
                    columns={columns}
                    components={components}
                    dataSource={this.state.data} />
            </div>
        )
    }
}

export default TableComp;