var express = require('express');
var app = express();

app.use(express.static('E:/untitled'));

// app.all('/', function (req, res, next) {
// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Headers", "X-Requested-With");
//         next();
// });

app.get('/getAjax', function (req, res) {
    console.log('req.query:', req.query)
    res.send({param:JSON.stringify(req.query)});
});

app.post('/postAjax', function (req, res) {
    console.log(req)
    res.send({param: 123});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});