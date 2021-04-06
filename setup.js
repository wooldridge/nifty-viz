const config = require('./config'),
      axios = require('axios');

function handleError(err) {
  if (err.error &&
      err.error.errorResponse &&
      err.error.errorResponse.message) {
    console.log('Error: ' + err.error.errorResponse.message);
  } else {
    console.log(JSON.stringify(err, null, 2));
  }
}

function createREST() {
  var options = {
    method: 'POST',
    uri: 'http://' + config.host + ':8002/LATEST/rest-apis',
    data: config.restSetup,
    headers: {
      'Content-Type': 'application/json'
    },
    auth: config.auth
  };
  console.log(options);
  axios(options)
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
