class QueryResult {
    columns = [];
    rows = [];
    constructor(result) {
        this.columns = result.data.columns;
        this.rows = result.data.rows;
    }
    getColData(key, adj) {
        return this.rows.map(r => {
            return adj ? r[key].value/adj : r[key].value;
        })
    }
    getPairData(key1, adj1, key2, adj2, nameKey) {
            return this.rows.map(r => {
                let val1 = adj1 ? r[key1].value/adj1 : r[key1].value;
                let val2 = adj2 ? r[key2].value/adj2 : r[key2].value;
                let name = r[nameKey].value;
                if (val1 > 0 && val2 > 0) {
                    return {x: val1, y: val2, name: name};
                } else {
                    return null;
                }
            })
    }
}

export default QueryResult;