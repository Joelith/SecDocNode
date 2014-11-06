var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
	// Serialise the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user);
	});
	// Deserialise the user
	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	passport.use('local-login', new LocalStrategy({
		usernameField		: 'username',
		passwordField		: 'password',
		passReqToCallback 	: true
	},
	function (req, username, password, done) {
		// TODO: Let's just send back for now
		return done(null, {
			username	: username,
			password	: password
		});
	}));
}