import { observable, action, decorate, computed } from 'mobx';
import moment from 'moment';
// import worker from '../../../worker.js';
// import WebWorker from '../../../workerSetup';


class Table {
    // workerObj = new WebWorker(worker);
    data = [];
    // searchedData = [];
    columns = [];
    sorterArr = [];
    filterArr = [];
    searchText = '';


    syncData(properties) {
        this.data = properties.data;
        // this.searchedData = this.data
        this.columns = properties.columns;
        if (this.columns.length > 0) {
            this.columns[0].fixed = 'left';
        }
    }

    setTableColumn(store, columns) {
        store.columns = columns;
    }

    setData(store, data) {
        store.data = data;
    }

    setFilterArrProperties = (filterArr) => {
        this.filterArr = filterArr;
        // this.fetchWebWorker();
    }

    setSorterArrProperties = (sorterArr) => {
        this.sorterArr = sorterArr;
        // this.fetchWebWorker();
    }

    setSearchText = (searchText) => {
        this.searchText = searchText;
        // this.fetchWebWorker()
    }


    // fetchWebWorker = () => {
    //     const nonEmptyFilter = this.filterArr.filter(filter => !this.resolveEmptyFilters(filter['selectedFilter'], filter['textInput']));
    //     if (nonEmptyFilter.length === 0 && this.searchText === '' && this.sorterArr.length === 0) {
    //         this.searchedData = this.data;
    //         return;
    //     }

    //     console.time('startworker')

    //     this.workerObj.postMessage(JSON.stringify({ data: this.data, searchText: this.searchText, filterArr: this.filterArr, sorterArr: this.sorterArr }));
    //     console.time('startworker1')
    //     this.workerObj.addEventListener('message', event => {
    //         console.log('smit---', event.data)
    //         console.timeEnd('startworker1')
    //         this.searchedData = event.data;
    //         console.timeEnd('startworker');
    //     });
    // }


    resolveFilters(obj, property) {
        const column = property['column']
        const filter = property['selectedFilter']
        const text = property['textInput']
        switch (filter) {
            case 'contains':
                return obj[column] && obj[column].includes(text)
            case 'is':
                return obj[column] && obj[column] === text
            case 'isNot':
                return obj[column] ? !obj[column] === text : true
            case 'doesNotContain':
                return obj[column] ? !(obj[column].includes(text)) : true

            case 'isEmpty':
                return !(obj[column])
            case 'isNotEmpty':
                return (obj[column])
            case 'equalTo':
                return obj[column] ? obj[column] === parseInt(text) : false
            case 'isNotEqualTo':
                return obj[column] ? obj[column] !== parseInt(text) : false
            case 'greaterThan':
                return obj[column] ? obj[column] > parseInt(text) : false
            case 'lessThan':
                return obj[column] ? obj[column] < parseInt(text) : false
            case 'greaterThanEqualTo':
                return obj[column] ? obj[column] >= parseInt(text) : false
            case 'lessThanEqualTo':
                return obj[column] ? obj[column] <= parseInt(text) : false
            case 'matchDate': {
                const dateString = property['dateString']
                const tempString = moment(obj[column]).format('YYYY-MM-DD');
                console.log('dateString', dateString);
                return obj[column] && (tempString.localeCompare(dateString) === 0 ? true : false)
            }
            case 'range':
                const fromString = property['fromString']
                const toString = property['toString']
                const tempString = moment(obj[column]).format('YYYY-MM-DD');
                return obj[column] && (tempString.localeCompare(toString) === -1 && tempString.localeCompare(fromString) === 1) ? true : false;
            default:
                return true;
        }
    }

    resolveEmptyFilters(filter, text) {
        switch (filter) {
            case 'contains':
            case 'is':
            case 'isNot':
            case 'doesNotContain':
            case 'equalTo':
            case 'isNotEqualTo':
            case 'greaterThan':
            case 'lessThan':
            case 'greaterThanEqualTo':
            case 'lessThanEqualTo':
                if (text === '') return true;
                return false
            default:
                return false
        }
    }


    get filteredData() {
        const nonEmptyFilter = this.filterArr.filter(filter => !this.resolveEmptyFilters(filter['selectedFilter'], filter['textInput']));
        if (nonEmptyFilter.length === 0) {
            return this.data;
        }

        return this.data.filter(obj => {
            let toTakeOrNot = false;
            const onlyOneFilter = nonEmptyFilter.length === 1;
            nonEmptyFilter.forEach(property => {
                const condition = property['condition'] || 'or';
                const resolvedFilter = this.resolveFilters(obj, property);
                if (condition === 'or') {
                    toTakeOrNot = toTakeOrNot || resolvedFilter;
                } else if (onlyOneFilter) {
                    toTakeOrNot = resolvedFilter;
                } else {
                    toTakeOrNot = toTakeOrNot && resolvedFilter;
                }
            });
            return toTakeOrNot;
        });
    }

    get sortedData() {
        const compare = (a, b) => {
            let compareResult = -1;
            let breakCompare = false;
            this.sorterArr.forEach(property => {
                if (!breakCompare) {
                    const key = property['column'];
                    const ascendingOrder = property['order'] === 'ascending';
                    const first = a[key];
                    const second = b[key];
                    if (first && second) {
                        if (first < second) {
                            compareResult = ascendingOrder ? -1 : 1;
                            breakCompare = true;
                        }
                        if (first > second) {
                            compareResult = ascendingOrder ? 1 : -1;
                            breakCompare = true;
                        }
                    } else if (first && !second) {
                        compareResult = -1;
                        breakCompare = true;
                    } else if (second && !first) {
                        compareResult = 1;
                        breakCompare = true;
                    }
                }
            });
            return compareResult;
        }
        return this.filteredData.sort(compare)
    }


    get computedData() {
        const searchedData = this.sortedData.filter(obj => {
            const tempArr = []
            for (let key in obj) {
                if (key !== 'key') {
                    tempArr.push(obj[key]);
                }
            }
            return JSON.stringify(tempArr).includes(this.searchText);
        });
        return searchedData
    }

    // get computedData() {
    //     console.log('dataISCHANGED--', this.searchedData)
    //     return this.searchedData;
    // }


}

decorate(Table, {
    data: observable,
    columns: observable,
    sorterArr: observable,
    filterArr: observable,
    setTableColumn: action,
    setSorterArrProperties: action,
    syncData: action,
    setFilterArrProperties: action,
    computedData: computed,
    sortedData: computed,
    filteredData: computed,
    setSearchText: action,
    setData: action,
    searchText: observable,
    // searchedData: observable,
})
export default Table;