var express = require('express');
var app = express();


var oracle = require('oracle');
var conn;

var connectData = {
	hostname	: 'localhost',
	port		: 1521,
	database	: 'orcl',
	user		: 'SECDEMO_cdoyle',
	password	: 'welcome1'
}

oracle.connect(connectData, function (err, connection) {
	if (err) { console.log('Error connecting to db:', err); return;}
	conn = connection;
});

app.get('/documents', function (req, res) {
	conn.execute("SELECT * FROM SECDEMO", [], function(err, results) {
		if (err) { console.log('Error executing query:', err); return; }
	
		res.write(JSON.stringify(results));
		res.end();		
	});
});

app.listen(9000);
console.log('Listening on 9000');