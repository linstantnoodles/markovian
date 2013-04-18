var express = require('express'),
    handlers = require('./handlers'),
    url = require('url'),
    app = express();

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/assets/' + 'index.html');
});

app.get('/text/:id', function(req, res) {
  handlers.getText(res, req.param('id'));
});

app.listen(8888);
console.log("Listening on port 8888");
