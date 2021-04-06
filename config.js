var config = {};

// curl -X POST --anyauth --user admin:admin -d @"./setup.json" \
// -H "Content-type: application/json" 'http://localhost:8002/LATEST/rest-apis'

config.host = "localhost";

config.database = {
  "name": "data-hub-FINAL",
  "modules": "data-hub-MODULES",
  "port": 8554
};

config.auth = {
  username: 'admin',
  password: 'admin'
};

config.restSetup = {
  "rest-api": {
    "name": config.database.name + "-rest",
    "database": config.database.name,
    //"modules-database": config.database.modules,
    "port": config.database.port,
    //"error-format": "json"
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = config;
}
