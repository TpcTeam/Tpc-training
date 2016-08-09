var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();
var dishRouter = require('./routers/dishRouter.js');
var promoRouter = require('./routers/promoRouter.js');
var leaderRouter = require('./routers/leaderRouter.js');

app.use(morgan('dev'));
app.use('/dishes', dishRouter());
app.use('/promotions', promoRouter());
app.use('/leadership', leaderRouter());
app.use(express.static(__dirname + '/public'));
app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});
