module.exports = function (app, passport, configDB) {
	var oracle = require('oracle');
	
	app.get('/', isLoggedIn, function (req, res) {
		configDB.user = req.user.username;
		configDB.password = req.user.password;
		console.log('connecting as', configDB);
		oracle.connect(configDB, function (err, connection) {
			if (err) { 
				console.log('Error connecting to db:', err);
				res.redirect('/logout');
				return;
			}
			connection.execute("SELECT * FROM SECDEMO", [], function(err, results) {
				if (err) { console.log('Error executing query:', err); return; }
				connection.close();
				res.render('index.ejs', {
					documents	: results,
					user		: req.user
				});
			});
		});
	});

	app.get('/login', function (req, res) {
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect	: '/',
		failureRedirect	: '/login',
		failureFlash	: true
	}))

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	}
}