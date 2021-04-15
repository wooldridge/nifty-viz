const config = require('./config'),
      marklogic = require('marklogic'),
      express = require('express'),
      // https://expressjs.com/en/resources/middleware/cors.html
      cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Set up MARKLOGIC
var db = marklogic.createDatabaseClient(config.marklogic);
console.log(db);
var q = marklogic.queryBuilder;
const op = marklogic.planBuilder;
 
const booksTest = [
    {title: 'Harry Potter', id: 1},
    {title: 'Twilight', id: 2},
    {title: 'Lorien Legacies', id: 3}
]
 
app.get('/', (req, res) => {
    res.send('Welcome!');
});
 
app.get('/api/books', (req,res)=> {
    res.send(booksTest);
});

// GET photo
app.post('/api/test', cors(), function(req, res, next) {
    console.log(req.body);
    const nfts = op.fromView(null, 'Nft');
    const results = op.fromView(null, 'Results');
    const plan = nfts.joinInner(results, op.on(nfts.col('nftId'), results.col('forNft')))
        .orderBy(op.desc('priceChangePercent'))
        .limit(10);
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