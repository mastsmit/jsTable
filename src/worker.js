export default () => {

	const getSortedData = (data, sorterArr) => {

		const compare = (a, b) => {
			let compareResult = -1;
			let breakCompare = false;
			sorterArr.forEach(property => {
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
		return data.sort(compare)
	}

	const resolveFilters = (obj, column, filter, text) => {
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

	const resolveEmptyFilters = (filter, text) => {
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


	const getFilteredData = (filterArr, data) => {
		const nonEmptyFilter = filterArr.filter(filter => !resolveEmptyFilters(filter['selectedFilter'], filter['textInput']));
		if (nonEmptyFilter.length === 0) {
			return data;
		}

		return data.filter(obj => {

			let toTakeOrNot = false;
			nonEmptyFilter.forEach(property => {
				const condition = property['condition'] || 'or';
				const resolvedFilter = resolveFilters(obj, property['column'], property['selectedFilter'], property['textInput']);
				if (condition === 'or') {
					toTakeOrNot = toTakeOrNot || resolvedFilter;
				} else {
					toTakeOrNot = toTakeOrNot && resolvedFilter;
				}
			});
			return toTakeOrNot;
		});
	}

	self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
		if (!e) return;
		const { data, searchText, filterArr, sorterArr } = JSON.parse(e.data);
		const filteredData = getFilteredData(filterArr, data);
		const sortedData = getSortedData(filteredData, sorterArr)
		const searchedData = sortedData.filter(obj => {
			const tempArr = []
			for (let key in obj) {
				if (key !== 'key') {
					tempArr.push(obj[key]);
				}
			}
			return JSON.stringify(tempArr).includes(searchText);
		});
		postMessage(searchedData);
	})
}
