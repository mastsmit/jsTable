import { observable, action, decorate, computed } from 'mobx';


class Table {
    data = [];
    columns = [];
    sorterArr = [];
    filterArr = [];
    searchText = '';


    syncData(properties) {
        this.data = properties.data;
        this.columns = properties.columns;
        if (this.columns.length > 0) {
            this.columns[0].fixed = 'left';
        }
    }

    setTableColumn(columns) {
        this.columns = columns;
    }

    setSo(properties) {
        this.data = properties.data;
        this.columns = properties.columns;
    }
    setFilterArrProperties = (filterArr) => {
        console.log('filterArr', filterArr);
        this.filterArr = filterArr;
    }

    setSorterArrProperties = (sorterArr) => {
        console.log('sorterArr', sorterArr);
        this.sorterArr = sorterArr;
    }

    setSearchText = (searchText) => {
        this.searchText = searchText;
    }

    resolveFilters(obj, column, filter, text) {
        console.log('column', column, 'filter', filter, 'text', text);
        switch (filter) {
            case 'contains':
                if (text === '') return true;
                return obj[column] && obj[column].includes(text)

            case 'is':
                if (text === '') return true;
                return obj[column] && obj[column] === text

            case 'isNot':
                if (text === '') return true;
                return obj[column] ? !obj[column] === text : true

            case 'doesNotContain':
                if (text === '') return true;
                return obj[column] ? !(obj[column].includes(text)) : true

            case 'isEmpty':
                return !(obj[column])
            case 'isNotEmpty':
                return (obj[column])
            case 'equalTo':
                if (text === '') return true;
                return obj[column] ? obj[column] === parseInt(text) : false
            case 'isNotEqualTo':
                if (text === '') return true;
                return obj[column] ? obj[column] !== parseInt(text) : false
            case 'greaterThan':
                if (text === '') return true;
                return obj[column] ? obj[column] > parseInt(text) : false
            case 'lessThan':
                if (text === '') return true;
                return obj[column] ? obj[column] < parseInt(text) : false
            case 'greaterThanEqualTo':
                if (text === '') return true;
                return obj[column] ? obj[column] >= parseInt(text) : false
            case 'lessThanEqualTo':
                if (text === '') return true;
                return obj[column] ? obj[column] <= parseInt(text) : false
            default:
                return true
        }
    }

    resolveFilters2(column, filter, text) {
        console.log('column', column, 'filter', filter, 'text', text);
        switch (filter) {
            case 'contains':
                if (text === '') return this.data;
                else {
                    return this.data.filter(obj => {
                        if (obj[column] && obj[column].includes(text)) {
                            return obj;
                        }
                    })
                }
            case 'is':
                if (text === '') return this.data;
                else {
                    return this.data.filter(obj => {
                        if (obj[column] && obj[column] === text) {
                            return obj;
                        }
                    })
                }
            case 'isNot':
                if (text === '') return this.data;
                else {
                    return this.data.filter(obj => {
                        if (obj[column]) {
                            if (!(obj[column] === text)) {
                                return obj;
                            }
                        }
                        else {
                            return obj
                        }
                    })
                }
            case 'doesNotContain':
                if (text === '') return this.data;
                else {
                    return this.data.filter(obj => {
                        if (obj[column]) {
                            if (!(obj[column].includes(text))) {
                                return obj;
                            }
                        }
                        else return obj
                    })
                }
            case 'isEmpty':
                return this.data.filter(obj => {
                    if (!obj[column]) {
                        return obj
                    }
                })
            case 'isNotEmpty':
                return this.data.filter(obj => {
                    if (obj[column]) {
                        return obj
                    }
                })
            case 'equalTo':
                if (text === '') return this.data;
                return this.data.filter(obj => {
                    if (obj[column]) {
                        if (obj[column] === parseInt(text)) {
                            return obj
                        }
                    }
                })
            case 'isNotEqualTo':
                if (text === '') return this.data;
                return this.data.filter(obj => {
                    if (obj[column] && obj[column] !== parseInt(text)) {
                        return obj
                    }
                })
            case 'greaterThan':
                if (text === '') return this.data;
                return this.data.filter(obj => {
                    if (obj[column] && obj[column] > parseInt(text)) {
                        return obj;
                    }
                })
            case 'lessThan':
                if (text === '') return this.data;
                return this.data.filter(obj => {
                    if (obj[column] && obj[column] < parseInt(text)) {
                        return obj;
                    }
                })
            case 'greaterThanEqualTo':
                if (text === '') return this.data;
                return this.data.filter(obj => {
                    if (obj[column] && obj[column] >= parseInt(text)) {
                        return obj;
                    }
                })
            case 'lessThanEqualTo':
                if (text === '') return this.data;
                return this.data.filter(obj => {
                    if (obj[column] && obj[column] <= parseInt(text)) {
                        return obj;
                    }
                })
            default:
                return this.data
        }
    }

    get filteredData() {
        if (this.filterArr.length === 0) {
            return this.data;
        }

        return this.data.filter(obj => {
            let toTakeOrNot = false;
            this.filterArr.forEach(property => {
                const condition = property['condition'] || 'or';
                const resolvedFilter = this.resolveFilters(obj, property['column'], property['selectedFilter'], property['textInput']);
                if (condition === 'or') {
                    toTakeOrNot = toTakeOrNot || resolvedFilter;
                } else {
                    toTakeOrNot = toTakeOrNot && resolvedFilter;
                }
            });
            return toTakeOrNot;
        });
    }

    get sortedData() {
        console.log('called sorted data function----')
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
        console.log('vdafdafdsa', searchedData)
        return searchedData
    }



}

decorate(Table, {
    data: observable,
    columns: observable,
    sorterArr: observable,
    filterArr: observable,
    setSorterArrProperties: action,
    syncData: action,
    setFilterArrProperties: action,
    computedData: computed,
    sortedData: computed,
    filteredData: computed,
    setSearchText: action,
    searchText: observable
})
export default Table;