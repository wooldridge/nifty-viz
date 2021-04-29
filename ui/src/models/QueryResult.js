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
}

export default QueryResult;