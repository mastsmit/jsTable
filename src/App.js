import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Model from './components/model'
import TableComp from './components/Table';
import { theme } from './consts/themeColors';
import './App.css';
import data_large from './largeData.json';
import { Switch } from 'antd';
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
    column1: 'smit',
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
    key: 3,
    date: '2018-04-12',
    amount: 120,
    column2: 'uber',
    column1: 'udit',
    type: 'income',
    note: 'transfer',
  },
  {
    key: 4,
    date: '2018-04-12',
    column1: 'harshit',
    type: 'income',
    note: 'transfer',
  },
  {
    key: 5,
    date: '2018-06-12',
    amount: 500,
    column1: 'lyearn',
    column2: 'google',
    type: 'income',
    note: 'transfer',
  },
  {
    key: 6,
    date: '2019-06-12',
    amount: 400,
    column2: 'uber',
    column1: 'smith John',
    type: 'income',
    note: 'transfer',
  },
  {
    key: 7,
    date: '2019-02-12',
    amount: 50,
    column2: 'uber',
    column1: 'shah udit',
    type: 'income',
    note: 'transfer',
  },
  {
    key: 8,
    date: '2019-07-12',
    amount: 10,
    type: 'income',
    note: 'transfer',
  },
  {
    key: 9,
    date: '2022-07-12',
    type: 'income',
    amount: 700,
    note: 'transfer',
  },
  {
    key: 10,
    date: '2020-07-12',
    type: 'income',
    amount: 10,
    note: 'transfer',
  },
  {
    key: 11,
    date: '2022-08-12',
    type: 'income',
    note: 'transfer',
  },
  {
    key: 12,
    date: '2022-09-12',
    type: 'income',
    note: 'transfer',
  },
  {
    key: 13,
    date: '2022-10-12',
    type: 'income',
    note: 'transfer',
  },
  {
    key: 14,
    date: '2022-07-12',
    type: 'income',
    note: 'transfer',
  },
]

const columns = [
  {
    titleString: 'Amount',
    dataIndex: 'amount',
    type: 'date',
    columnDataType: 'number',
  },
  {
    titleString: 'Date',
    dataIndex: 'date',
    width: 200,
    columnDataType: 'date',
  },
  {
    titleString: 'Column1',
    dataIndex: 'column1',
    columnDataType: 'text',
  },
  {
    titleString: 'Column2',
    dataIndex: 'column2',
    columnDataType: 'text',
  },
  {
    titleString: 'Type',
    dataIndex: 'type',
    columnDataType: 'text',
  },
  {
    titleString: 'Note',
    dataIndex: 'note',
    columnDataType: 'text',
  },
]

const dates = ['2020-1-20', '2020-2-20', '2020-3-20', '2019-1-1', '2019-2-20']
class App extends Component {
  constructor(props) {
    super(props);
    const data_large_with_unique_keys = data_large.map(obj => {
      obj.key = uuidv4();
      obj['date'] = moment(dates[Math.floor(Math.random() * dates.length)]).toISOString();
      return obj
    });
    this.state = { isDarkMode: true };
    this.model = new Model();
    this.model.store.syncData({
      data: data_large_with_unique_keys,
      columns
    });
  }

  onChange = () => {
    this.setState({ isDarkMode: !this.state.isDarkMode });
  }

  render() {
    return (
      <div className="App" >
        Light <Switch onChange={this.onChange} />
        {this.state.isDarkMode ?
          <TableComp colors={darkColors} model={this.model} />
          :
          <TableComp model={this.model} colors={lightColors} />
        }
      </div>
    );
  }
}

export default App;
