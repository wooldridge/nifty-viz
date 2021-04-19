const config = require('./config'),
      marklogic = require('marklogic'),
      express = require('express'),
      // https://expressjs.com/en/resources/middleware/cors.html
      cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Set up MarkLogic API
var db = marklogic.createDatabaseClient(config.marklogic);
const op = marklogic.planBuilder;

// Add order by, order direction info to plan if needed
const checkOrder = (plan, query) => {
    if (query.orderBy) {
        if (query.orderDir && query.orderDir === "desc") {
            return plan.orderBy(op.desc(query.orderBy));
        } else {
            return plan.orderBy(op.asc(query.orderBy))
        }
    } else {
        return plan;
    }
}

// Add limit info to plan if needed
const checkLimit = (plan, query) => {
    if (query.limit) {
        return plan.limit(parseInt(query.limit));
    } else {
        return plan;
    }
}

// GET all NFTs
app.get('/api/nfts', cors(), function(req, res, next) {
    console.log(req.body);
    const nfts = op.fromView(null, 'Nft');
    const artists = op.fromView(null, 'Artist');
    const results = op.fromView(null, 'Results');
    let plan = nfts.joinInner(results, op.on(nfts.col('nftId'), results.col('forNft')))
        .joinInner(artists, op.on(nfts.col('byArtist'), artists.col('artistId')));
    plan = checkOrder(plan, req.query);
    plan = checkLimit(plan, req.query);
    console.log(plan);
    db.rows.query(plan, { format: 'json', structure: 'object', columnTypes: 'rows' })
    .then(function(results) {
        res.json(results);
    }, function(error) {
        console.dir(error);
    });
});

// GET an NFT by ID
app.get('/api/nfts/:id', cors(), function(req, res, next) {
    console.log(req.body);
    const nftId = req.params["id"];
    const nfts = op.fromView(null, 'Nft');
    const artists = op.fromView(null, 'Artist');
    const results = op.fromView(null, 'Results');
    let plan = nfts.joinInner(results, op.on(nfts.col('nftId'), results.col('forNft')))
        .joinInner(artists, op.on(nfts.col('byArtist'), artists.col('artistId')))
        .where(op.eq(nfts.col('nftId'), nftId));
    plan = checkOrder(plan, req.query);
    plan = checkLimit(plan, req.query);
    db.rows.query(plan, { format: 'json', structure: 'object', columnTypes: 'rows' })
    .then(function(results) {
        res.json(results);
    }, function(error) {
        console.dir(error);
    });
});

// GET all Artists
app.get('/api/artists', cors(), function(req, res, next) {
    console.log(req.body);
    const artists = op.fromView(null, 'Artist');
    let plan = artists;
    plan = checkOrder(plan, req.query);
    plan = checkLimit(plan, req.query);
    db.rows.query(plan, { format: 'json', structure: 'object', columnTypes: 'rows' })
    .then(function(results) {
        res.json(results);
    }, function(error) {
        console.dir(error);
    });
});

// GET an Artist by ID
app.get('/api/artists/:id', cors(), function(req, res, next) {
    console.log(req.body);
    const artistId = req.params["id"];
    const artists = op.fromView(null, 'Artist');
    let plan = artists.where(op.eq(artists.col('artistId'), artistId));
    plan = checkOrder(plan, req.query);
    plan = checkLimit(plan, req.query);
    db.rows.query(plan, { format: 'json', structure: 'object', columnTypes: 'rows' })
    .then(function(results) {
        res.json(results);
    }, function(error) {
        console.dir(error);
    });
});

// GET an Artist's NFTs
app.get('/api/artists/:id/nfts', cors(), function(req, res, next) {
    console.log(req.body);
    const artistId = req.params["id"];
    const nfts = op.fromView(null, 'Nft');
    const artists = op.fromView(null, 'Artist');
    const results = op.fromView(null, 'Results');
    let plan = nfts.joinInner(results, op.on(nfts.col('nftId'), results.col('forNft')))
        .joinInner(artists, op.on(nfts.col('byArtist'), artists.col('artistId')))
        .where(op.eq(artists.col('artistId'), artistId));
    plan = checkOrder(plan, req.query);
    plan = checkLimit(plan, req.query);
    db.rows.query(plan, { format: 'json', structure: 'object', columnTypes: 'rows' })
    .then(function(results) {
        res.json(results);
    }, function(error) {
        console.dir(error);
    });
});

 
// Set port, start server
const port = process.env.PORT || 8889;
app.listen(port, () => console.log(`Listening on port ${port}..`));