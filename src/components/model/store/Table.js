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
            default:
                return true
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
            nonEmptyFilter.forEach(property => {
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