import React from 'react';
import TableComp from './components/Table';
import { theme } from './consts/themeColors';
import './App.css';

function App() {
  const darkColors = theme.color.dark;
  const lightColors = theme.color.light;
  const data = [
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
      amount: 120,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 2,
      date: '2018-04-12',
      amount: 120,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 2,
      date: '2018-04-12',
      type: 'income',
      note: 'transfer',
    },
  ]
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Column1',
      dataIndex: 'column1',
    },
    {
      title: 'Column2',
      dataIndex: 'column2',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Note',
      dataIndex: 'note',
    },
  ]
  return (
    <div>
      {darkColors?
    <div className="App">
      <TableComp colors={darkColors} dataSource={data} columns={columns} />
     
    </div>:
     <TableComp colors={lightColors} dataSource={data} columns={columns} />
          } 
         </div>

  );
}

export default App;
