const config = require('../config'),
      marklogic = require('marklogic'),
      express = require('express'),
      cors = require('cors');
const app = express();
app.use(express.json());

// Set up MARKLOGIC
var db = marklogic.createDatabaseClient(config.marklogic);
console.log(db);
var q = marklogic.queryBuilder;
const op = marklogic.planBuilder;
 
const books = [
{title: 'Harry Potter', id: 1},
{title: 'Twilight', id: 2},
{title: 'Lorien Legacies', id: 3}
]
 
//READ Request Handlers
app.get('/', (req, res) => {
res.send('Welcome to Edurekas REST API with Node.js Tutorial!!');
});
 
app.get('/api/books', (req,res)=> {
res.send(books);
});

// GET photo
app.get('/api/test', cors(), function(req, res, next) {
    const plan = op.fromView(null, 'Product');
    db.rows.query(plan, { format: 'json', structure: 'object', columnTypes: 'rows' })
    .then(function(results) {
        res.json(results);
    }, function(error) {
        console.dir(error);
    });
});
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8889;
app.listen(port, () => console.log(`Listening on port ${port}..`));