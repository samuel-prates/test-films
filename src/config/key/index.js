const fs = require('fs');

module.exports = {
  key: fs.readFileSync(`${__dirname}/app_name-wildcard.key`),
  cert: fs.readFileSync(`${__dirname}/app_name-wildcard.cert`),
  secureProtocol: 'TLSv1_2_server_method'
};
