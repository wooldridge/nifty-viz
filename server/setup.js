const config = require('./config'),
      // TODO axios REST calls not working against Manage on 8002
      //axios = require('axios'),
      rp = require('request-promise');

function handleError(err) {
  if (err.error &&
      err.error.errorResponse &&
      err.error.errorResponse.message) {
    console.log('Error: ' + err.error.errorResponse.message);
  } else {
    console.log(JSON.stringify(err, null, 2));
  }
}

// TODO not needed? Use Data Hub final server...
function createREST() {
  var options = {
    method: 'POST',
    uri: 'http://localhost:8002/v1/rest-apis',
    body: config.restSetup,
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  console.log(options);
  rp(options)
    .then(function (parsedBody) {
      console.log('REST instance created at port: ' + config.restSetup["rest-api"]["port"]);
    })
    .catch(function (err) {
      handleError(err);
    });
}

function start() {
    createREST();
}

start();
